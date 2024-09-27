package com.ssafy.moyeobang.payment.application.port.in;

import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;

public interface PaymentUseCase {
    boolean confirmPayment(PaymentCommand command);

    PaymentResult processPayment(PaymentCommand command);
}
