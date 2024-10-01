package com.ssafy.moyeobang.payment.application.port.out;

public interface ConfirmPaymentPort {
    void confirmPaymentSuccess(String paymentRequestId);

    void confirmPaymentFailure(String paymentRequestId);

}
