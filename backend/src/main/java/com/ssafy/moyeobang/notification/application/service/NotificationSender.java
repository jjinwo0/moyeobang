package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.SendResponse;
import com.ssafy.moyeobang.notification.error.NotificationSendException;
import jakarta.annotation.PreDestroy;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationSender {

    // 동시성 처리 -> 통과 가능한 스레드의 수를 지정
    private final ExecutorService executor = Executors.newFixedThreadPool(8);

    // 동시성 처리 -> 시스템에 따라 유동적으로 Pool 조정
//    private final ExecutorService executor = Executors.newCachedThreadPool();

    private static final int RETRY_COUNT = 5;

    private final ConcurrentHashMap<Message, AtomicInteger> retryCounts = new ConcurrentHashMap<>();

    public void send(Message message) {
        retryCounts.put(message, new AtomicInteger(0));
        sendInternal(message);
    }

    public void sendInternal(Message message) {

        ApiFuture<String> future = FirebaseMessaging.getInstance().sendAsync(message);

        future.addListener(() -> {
            try {
                String response = future.get();
                log.info("알림 전달 성공: " + response);
                retryCounts.remove(message);
            } catch (Exception e) {
                log.error("알림 전달 실패: ", e);
                handleFailure(message);
            }
        }, executor);
    }

    private void handleFailure(Message message) {
        AtomicInteger retryCount = retryCounts.get(message);
        if (retryCount.incrementAndGet() <= RETRY_COUNT) {
            log.info("재시도 횟수: " + retryCount.get());
            sendInternal(message); // 재시도
        } else {
            log.error("최대 재시도 횟수 초과 - 알림 전송 실패: " + message);
            throw new NotificationSendException("알림 전송 실패: " + message);
        }
    }

    public void sendAll(List<Message> messageList) {

        ApiFuture<BatchResponse> future = FirebaseMessaging.getInstance().sendAllAsync(messageList);

        future.addListener(() -> {
            try {
                BatchResponse response = future.get();
                log.info("잔액 알림 전달 성공 갯수: " + response.getSuccessCount());
                handleListFailure(response, messageList);
            } catch (Exception e) {
                log.error("배치 알림 전달 실패: ", e);
            }
        }, executor);
    }

    private void handleListFailure(BatchResponse response, List<Message> messageList) {
        if (response.getFailureCount() > 0) {
            log.info("전달 실패 갯수: " + response.getFailureCount());
            List<SendResponse> failedResponses = response.getResponses().stream()
                    .filter(sendResponse -> !sendResponse.isSuccessful())
                    .collect(Collectors.toList());

            // 실패한 메시지 재시도
            log.info("실패 알림 전달 재시도");
            for (int i = 0; i < failedResponses.size(); i++) {
                SendResponse sendResponse = failedResponses.get(i);
                if (!sendResponse.isSuccessful()) {
                    Message failedMessage = messageList.get(i);
                    send(failedMessage); // 재시도
                }
            }
        }
    }

    @PreDestroy
    public void shutdownExecutor() {
        executor.shutdown();
    }
}
