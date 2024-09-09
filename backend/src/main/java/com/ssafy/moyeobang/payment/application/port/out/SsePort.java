package com.ssafy.moyeobang.payment.application.port.out;

public interface SsePort {
    void sendPaymentSuccess(String transactionId, String message);

    void sendPaymentFailure(String transactionId, String message);
}
