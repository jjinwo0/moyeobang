package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.adapter.in.web.request.OfflinePaymentRequest;
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
            ssePort.sendPaymentSuccess(request.paymentSessionId(), "Payment successfully");
        } else {
            ssePort.sendPaymentFailure(request.paymentSessionId(), "Payment failed");
        }
        return paymentSuccess;
    }

    // TODO: API 싸피 뱅크 연결
    private boolean processPayment(OfflinePaymentRequest paymentRequest) {
        return true;
    }
}
