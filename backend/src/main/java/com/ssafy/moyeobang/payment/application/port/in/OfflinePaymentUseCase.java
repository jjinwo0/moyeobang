package com.ssafy.moyeobang.payment.application.port.in;

public interface OfflinePaymentUseCase {
    boolean confirmPayment(PaymentCommand command);
}
