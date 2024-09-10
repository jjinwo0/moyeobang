package com.ssafy.moyeobang.payment.application.port.in;

import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.error.InsufficientBalanceException;

public interface OfflinePaymentUseCase {
    boolean confirmPayment(OfflinePaymentRequest request) throws InsufficientBalanceException;
}
