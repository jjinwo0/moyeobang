package com.ssafy.pg.utils;


import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Component
@RequiredArgsConstructor
public class SseUtils {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public boolean add(String transactionId, SseEmitter emitter) {
        SseEmitter previousEmitter = this.emitters.put(transactionId, emitter);
        if (previousEmitter != null) {
            return false;
        }

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


    public void sendPaymentSuccess(String transactionId) {
        sendEvent(transactionId, "payment-success", "success");
    }

    public void sendPaymentFailure(String transactionId) {
        sendEventMsg(transactionId, "payment-failed", "fail");
    }

    public void sendConnectedMessage(String transactionId) {
        sendEventMsg(transactionId, "connect", "connected!");
    }
}
