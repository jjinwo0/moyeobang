package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class SseEmittersAdapter implements SsePort {

    private final SseUtils sseUtils;

    public void sendPaymentSuccess(String transactionId, String message) {
        sseUtils.sendPaymentSuccess(transactionId, message);
    }

    public void sendPaymentFailure(String transactionId, String message) {
        sseUtils.sendPaymentFailure(transactionId, message);
    }
}
