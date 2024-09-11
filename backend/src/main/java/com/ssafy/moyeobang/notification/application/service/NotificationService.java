package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.adapter.out.NotificationAdapter;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.Executors;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class NotificationService implements NotificationUseCase, FCMTokenPort {

    private final NotificationAdapter adapter;

    @Override
    public void sendNotification(NotificationPayload payload) {

        /*
        회원가입 했을 때, 주어지는 FCM 토큰이 있고 이것이 담겨있다고 가정
         */
        if (!hasKey(payload.email())) {
            log.warn("["+payload.email()+"] 에 해당하는 FCM 토큰이 없습니다.");
            return;
        }

        String token = getToken(payload.email());

        Message message = Message.builder()
                .putData("title", payload.title())
                .putData("content", payload.body())
                .setToken(token)
                .build();

        send(message);
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
        }, Executors.newSingleThreadExecutor());
    }

    @Override
    public String getToken(String email) {

        return adapter.getToken(email);
    }

    @Override
    public boolean hasKey(String email) {

        return adapter.hasKey(email);
    }
}
