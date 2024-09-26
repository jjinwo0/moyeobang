package com.ssafy.moyeobang.payment.application.port.in;

public interface PaymentUseCase {
    boolean confirmPayment(PaymentCommand command);

    boolean processPayment(PaymentCommand command);
}
