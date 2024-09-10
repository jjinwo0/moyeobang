package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.notification.adapter.in.web.request.NotificationPayload;
import com.ssafy.moyeobang.notification.adapter.out.redis.FCMTokenRedisAdapter;
import com.ssafy.moyeobang.notification.application.port.in.NotificationUseCase;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class FCMService implements NotificationUseCase, FCMTokenPort {

    private final FCMTokenRedisAdapter redisAdapter;

    @Override
    public void sendNotification(NotificationPayload payload) {

        if (!hasKey(payload.email())) {
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

    @Override
    public void saveToken(String email, String token) {

        redisAdapter.saveToken(email, token);
    }

    @Override
    public void deleteToken(String email) {

        redisAdapter.deleteToken(email);
    }

    private void send(Message message) {

        ApiFuture<String> future = FirebaseMessaging.getInstance().sendAsync(message);
    }

    @Override
    public String getToken(String email) {

        return redisAdapter.getToken(email);
    }

    @Override
    public boolean hasKey(String email) {

        return redisAdapter.hasKey(email);
    }
}
