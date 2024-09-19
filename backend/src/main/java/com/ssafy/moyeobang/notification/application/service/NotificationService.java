package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.SendResponse;
import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberTravelInfoInTravelPort;
import jakarta.annotation.PreDestroy;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
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

    private final ExecutorService executor = Executors.newSingleThreadExecutor();

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

                        send(message);
                    }
                });
    }

    /*
    22시에 여행에 참여중인 각 회원들에게 잔액 알림 전달
     */
    @Override
    @Scheduled(cron = "0 0 22 * * ?", zone = "Asia/Seoul")
    public void sendBalanceCheckNotification() throws FirebaseMessagingException {

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

        BatchResponse response = FirebaseMessaging.getInstance().sendAll(messageList);

        if (response.getFailureCount() > 0) {

            log.info("전달 실패 갯수: " + response.getFailureCount());

            List<SendResponse> failedResponses = response.getResponses().stream()
                    .filter(sendResponse -> !sendResponse.isSuccessful()) // 성공하지 않은 경우 필터링
                    .toList();

            // 실패한 메시지에 대한 로깅 및 추가 처리
            failedResponses.forEach(failedResponse -> {
                log.error("알림 전달 실패: " + failedResponse.getException().getMessage());
                // TODO: 추가적인 실패 처리 로직 (예: 재시도, 관리자 알림 등)
            });
        }

        log.info("잔액 알림 전달 성공: " + response.getSuccessCount());
    }

    void send(Message message) {

        ApiFuture<String> future = FirebaseMessaging.getInstance().sendAsync(message);

        future.addListener(() -> {
            try {
                String response = future.get();
                log.info("알림 전달 성공: " + response);
            } catch (Exception e) {
                log.error("알림 전달 실패: ", e);
            }
        }, executor);
    }

    private boolean memberHasKey(String email) {

        if (!tokenPort.hasKey(email)) {
            log.warn("[" + email + "] 에 해당하는 FCM 토큰이 없습니다.");
            return false;
        }

        return true;
    }

    @PreDestroy
    public void shutdownExecutor() {
        executor.shutdown();
    }
}
