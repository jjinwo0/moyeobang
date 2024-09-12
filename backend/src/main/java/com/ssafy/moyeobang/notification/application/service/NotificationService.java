package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberInTravelPort;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class NotificationService implements NotificationUseCase {

    private final FCMTokenPort tokenPort;

    private final LoadMemberInTravelPort loadMemberInTravelPort;

    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @Override
    public void sendNotification(Long travelId, NotificationPayload payload) {

        /*
        회원가입 했을 때, 주어지는 FCM 토큰이 있고 이것이 담겨있다고 가정
         */
        List<Member> findMemberList = loadMemberInTravelPort
                .findMemberIdByMemberTravelEntity(travelId);

        // 알림 비동기 전달
        findMemberList.parallelStream()
                .forEach(member -> {

                    if (!tokenPort.hasKey(member.getEmail())) {
                        log.warn("[" + member.getEmail() + "] 에 해당하는 FCM 토큰이 없습니다.");
                        return;
                    }

                    String token = tokenPort.getToken(member.getEmail());

                    Message message = Message.builder()
                            .putData("title", payload.title())
                            .putData("content", "공금 " + payload.amount() + "원 입금을 요청했어요.")
                            .setToken(token)
                            .build();

                    send(message);
                });
    }

    private void send(Message message) {

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
}
