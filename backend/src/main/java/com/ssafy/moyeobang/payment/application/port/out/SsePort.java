package com.ssafy.moyeobang.payment.application.port.out;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SsePort {
    void sendConnectedMessage(String transactionId);

    void sendPaymentSuccess(String transactionId, PaymentResult paymentResult);

    void sendPaymentFailure(String transactionId, String message);

    void addSseEmitter(String transactionId, SseEmitter emitter);
}
