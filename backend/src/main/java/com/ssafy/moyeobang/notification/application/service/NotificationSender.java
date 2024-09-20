package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.SendResponse;
import jakarta.annotation.PreDestroy;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationSender {

    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    public void send(Message message) {

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

    public void sendAll(List<Message> messageList) {

        ApiFuture<BatchResponse> future = FirebaseMessaging.getInstance().sendAllAsync(messageList);

        future.addListener(() -> {
            try {
                BatchResponse response = future.get();
                log.info("잔액 알림 전달 성공: " + response.getSuccessCount());

                if (response.getFailureCount() > 0) {
                    log.info("전달 실패 갯수: " + response.getFailureCount());
                    List<SendResponse> failedResponses = response.getResponses().stream()
                            .filter(sendResponse -> !sendResponse.isSuccessful())
                            .toList();

                    failedResponses.forEach(failedResponse -> {
                        log.error("알림 전달 실패: " + failedResponse.getException().getMessage());
                        // TODO: 추가적인 실패 처리 로직 (예: 재시도, 관리자 알림 등)
                    });
                }
            } catch (Exception e) {
                log.error("배치 알림 전달 실패: ", e);
            }
        }, executor);
    }

    @PreDestroy
    public void shutdownExecutor() {
        executor.shutdown();
    }
}
