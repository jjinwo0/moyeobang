package com.ssafy.moyeobang.payment.application.port.in;

import com.ssafy.moyeobang.payment.adapter.in.web.request.OfflinePaymentRequest;

public interface OfflinePaymentUseCase {
    boolean confirmPayment(OfflinePaymentRequest request);
}
