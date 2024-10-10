package com.ssafy.moyeobang.common.util;

import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Component
@RequiredArgsConstructor
public class SseUtils {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);


    public boolean add(String transactionId, SseEmitter emitter) {
        SseEmitter previousEmitter = this.emitters.put(transactionId, emitter);
        if (previousEmitter != null) {
            return false;
        }

        schedulePing(transactionId);

        emitter.onCompletion(() -> {
            emitter.complete();
            this.emitters.remove(transactionId);
        });

        emitter.onTimeout(() -> {
            emitter.complete();
            this.emitters.remove(transactionId);
        });

        return true;
    }

    public void sendEventMsg(String transactionId, String eventName, String message) {
        SseEmitter emitter = emitters.get(transactionId);
        if (emitter == null) {
            throw new RuntimeException("Cannot find enrolled emitter");
        }
        try {
            emitter.send(SseEmitter.event()
                    .name(eventName)
                    .data(message));
        } catch (IOException e) {
            throw new RuntimeException("Failed to send SSE event", e);
        }
    }

    public void sendEvent(String transactionId, String eventName, Object data) {
        SseEmitter emitter = emitters.get(transactionId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name(eventName).data(data));
                emitter.complete();
            } catch (IOException e) {
                throw new RuntimeException("Failed to send SSE event", e);
            } finally {
                emitters.remove(transactionId);
            }
        }
    }

    public SseEmitter getEmitter(String transactionId) {
        return emitters.get(transactionId);
    }


    public void sendPaymentSuccess(String transactionId, PaymentResult paymentResult) {
        sendEvent(transactionId, "payment-success", paymentResult);
    }

    public void sendPaymentFailure(String transactionId, String message) {
        sendEventMsg(transactionId, "payment-failed", message);
    }

    public void sendConnectedMessage(String transactionId) {
        sendEventMsg(transactionId, "connect", "connected!");
    }

    private void schedulePing(String transactionId) {
        scheduler.scheduleAtFixedRate(() -> {
            try {
                sendPing(transactionId);
            } catch (Exception e) {
                log.error("Failed to send ping for transactionId: {}", transactionId, e);
                emitters.remove(transactionId);
            }
        }, 10, 10, TimeUnit.SECONDS);
    }

    public void sendPing(String transactionId) {
        SseEmitter emitter = emitters.get(transactionId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("ping")
                        .data("ping"));
                log.info("Ping sent to transactionId: {}", transactionId);
            } catch (IOException e) {
                log.error("Failed to send ping event", e);
                emitters.remove(transactionId);
            }
        }
    }
}
