package com.ssafy.moyeobang.notification.application.service;

import com.google.firebase.messaging.Message;
import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import com.ssafy.moyeobang.notification.application.domain.Travel;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberTravelInfoInTravelPort;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ssafy.moyeobang.notification.application.port.out.LoadTravelPort;
import com.ssafy.moyeobang.notification.error.FailedSendNotificationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class NotificationService implements NotificationUseCase {

    private final FCMTokenPort tokenPort;

    private final LoadMemberTravelInfoInTravelPort memberTravelPort;

    private final LoadMemberPort memberPort;

    private final LoadTravelPort travelPort;

    private final NotificationSender sender;

    @Override
    public void sendNotification(Long travelId, NotificationPayload payload) {

        /*
        회원가입 했을 때, 주어지는 FCM 토큰이 있고 이것이 담겨있다고 가정
         */
        List<Member> findMemberList = memberTravelPort
                .findMemberIdByMemberTravelEntity(travelId);

        // 알림 비동기 전달
        findMemberList.parallelStream()
                .forEach(member -> {

                    if (memberHasKey(member.getEmail())) {

                        String token = tokenPort.getToken(member.getEmail());

                        Message message = Message.builder()
                                .putData("title", payload.title())
                                .putData("content", "공금 " + payload.amount() + "원 입금을 요청했어요.")
                                .setToken(token)
                                .build();

                        sender.send(message);
                    }
                });
    }

    /*
    22시에 여행에 참여중인 각 회원들에게 잔액 알림 전달
     */
    @Override
    @Scheduled(cron = "0 0 22 * * ?", zone = "Asia/Seoul")
    public void sendBalanceCheckNotification() {

        Map<Long, List<MemberTravel>> map = memberTravelPort.findAllMemberInTravel();

        // 알림을 개별적으로 보내지 않고 한번에 묶어서 보내어 쿼터 제한 위험 줄임 -> FCM 배치 메시지 활용
        List<Message> messageList = map.values().parallelStream()
                .flatMap(list -> list.parallelStream()
                        .map(memberTravel -> {

                            Member findMember = memberPort.findById(memberTravel.getMemberId());

                            String token = tokenPort.getToken(findMember.getEmail());

                            return Message.builder()
                                    .putData("title", "[여행 공금 잔액 알림]")
                                    .putData("content", "개인 공금 잔액이 " + memberTravel.getBalance() + "원 남았어요.")
                                    .setToken(token)
                                    .build();
                        }))
                .collect(Collectors.toList());

        sender.sendAll(messageList);
    }

    /*
    지정한 회원에게 입금 요구
     */
    @Override
    public void sendRemind(Long travelId, Long memberId, NotificationPayload payload) {

        Travel travel = travelPort.findById(travelId);

        Member member = memberPort.findById(memberId);

        if (!memberHasKey(member.getEmail()))
            throw new FailedSendNotificationException("입금 요청 전송에 실패했습니다.");

        String token = tokenPort.getToken(member.getEmail());

        Message message = Message.builder()
                .putData("title", "[" + travel.getTitle() + " 여행 공금 입금 요청]")
                .putData("content", payload.amount() + "원 입금 요청을 받았어요.")
                .setToken(token)
                .build();

        sender.send(message);
    }


    private boolean memberHasKey(String email) {

        if (!tokenPort.hasKey(email)) {
            log.warn("[" + email + "] 에 해당하는 FCM 토큰이 없습니다.");
            return false;
        }

        return true;
    }
}
