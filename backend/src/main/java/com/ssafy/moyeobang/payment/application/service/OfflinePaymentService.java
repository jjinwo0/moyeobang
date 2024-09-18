package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class OfflinePaymentService implements OfflinePaymentUseCase {

    private final SsePort ssePort;

    @Override
    public boolean confirmPayment(OfflinePaymentRequest request) {
        boolean paymentSuccess = processPayment(request);
        if (paymentSuccess) {
            ssePort.sendPaymentSuccess(request.paymentRequestId(), "Payment successfully");
        } else {
            ssePort.sendPaymentFailure(request.paymentRequestId(), "Payment failed");
        }
        return paymentSuccess;
    }


    private boolean processPayment(OfflinePaymentRequest request) {

        return true;
    }
}
