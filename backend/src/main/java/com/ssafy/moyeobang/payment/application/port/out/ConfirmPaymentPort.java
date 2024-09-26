package com.ssafy.moyeobang.payment.application.port.out;

public interface ConfirmPaymentPort {
    boolean confirmPayment(String paymentRequestId, boolean isCompleted);
}
