package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@PersistenceAdapter
@RequiredArgsConstructor
public class SseEmittersAdapter implements SsePort {

    private final SseUtils sseUtils;

    @Override
    public void sendConnectedMessage(String transactionId) {
        sseUtils.sendConnectedMessage(transactionId);
    }

    @Override
    public void sendPaymentSuccess(String transactionId, PaymentResult paymentResult) {
        sseUtils.sendPaymentSuccess(transactionId, paymentResult);
    }

    @Override
    public void sendPaymentFailure(String transactionId, String message) {
        sseUtils.sendPaymentFailure(transactionId, message);
    }

    @Override
    public void addSseEmitter(String transactionId, SseEmitter emitter) {
        sseUtils.add(transactionId, emitter);
    }
}
