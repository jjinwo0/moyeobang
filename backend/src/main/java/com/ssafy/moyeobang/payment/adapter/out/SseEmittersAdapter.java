package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.payment.adapter.out.sse.SseEmitters;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class SseEmittersAdapter implements SsePort {

    private final SseEmitters sseEmitters;

    public void sendPaymentSuccess(String transactionId, String message) {
        sseEmitters.sendPaymentSuccess(transactionId, message);
    }

    public void sendPaymentFailure(String transactionId, String message) {
        sseEmitters.sendPaymentFailure(transactionId, message);
    }
}
