package com.ssafy.moyeobang.common.util;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Component
public class SseUtils {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter add(String transactionId, SseEmitter emitter) {
        this.emitters.put(transactionId, emitter);
        log.info("New emitter added for transaction: {}", transactionId);

        emitter.onCompletion(() -> {
            log.info("onCompletion callback for transaction: {}", transactionId);
            this.emitters.remove(transactionId);
        });

        emitter.onTimeout(() -> {
            log.info("onTimeout callback for transaction: {}", transactionId);
            emitter.complete();
            this.emitters.remove(transactionId);
        });

        return emitter;
    }

    public void sendEvent(String transactionId, String eventName, String message) {
        SseEmitter emitter = emitters.get(transactionId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name(eventName)
                        .data(message));
                emitter.complete();
            } catch (IOException e) {
                log.error("Failed to send SSE event: {}", eventName, e);
                throw new RuntimeException("Failed to send SSE event", e);
            } finally {
                emitters.remove(transactionId);
            }
        } else {
            log.warn("Emitter not found for transaction: {}", transactionId);
        }
    }

    public void sendPaymentSuccess(String transactionId, String message) {
        sendEvent(transactionId, "payment-success", message);
    }

    public void sendPaymentFailure(String transactionId, String message) {
        sendEvent(transactionId, "payment-failed", message);
    }
}
