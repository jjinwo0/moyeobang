package com.ssafy.moyeobang.notification.application.service;

import com.google.api.core.ApiFuture;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.SendResponse;
import com.ssafy.moyeobang.notification.error.NotificationSendException;
import jakarta.annotation.PreDestroy;
import java.util.List;
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

    // 동시성 처리 -> 5개의 스레드를 동시 처리 (CPU Core 수)
    private final ExecutorService executor = Executors.newFixedThreadPool(16);

    private static final int RETRY_COUNT = 5;

    public void send(Message message, AtomicInteger retryCount) {

        ApiFuture<String> future = FirebaseMessaging.getInstance().sendAsync(message);

        future.addListener(() -> {
            try {
                String response = future.get();
                log.info("알림 전달 성공: " + response);
            } catch (Exception e) {
                log.error("알림 전달 실패: ", e);

                // 전송 재시도 로직
                if (retryCount.incrementAndGet() <= RETRY_COUNT) {

                    log.info("재시도 횟수: " + retryCount.get());
                    send(message, retryCount);
                } else {
                    log.error("최대 재시도 횟수 초과 - 알림 전송 실패");
                    throw new NotificationSendException("알림 전송 실패");
                }
            }
        }, executor);
    }

    public void sendAll(List<Message> messageList, AtomicInteger retryCount) {

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

                    // 전송 재시도 로직
                    List<Message> failedMessages = failedResponses.stream()
                            .map(sendResponse -> {
                                // 실패한 메시지의 인덱스를 추적하여 원래 메시지 리스트에서 메시지 추출.
                                int index = response.getResponses().indexOf(sendResponse);
                                return messageList.get(index);
                            })
                            .collect(Collectors.toList());

                    // 재시도 호출
                    if (retryCount.incrementAndGet() <= RETRY_COUNT) {
                        log.info("재시도 횟수: " + retryCount.get());
                        sendAll(failedMessages, retryCount);
                    } else {
                        log.error("최대 재시도 횟수를 초과하여 알림 전송에 실패하였습니다.");
                    }
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
