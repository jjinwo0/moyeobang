package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.adapter.out.persistence.account.MemberAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Member;
import com.ssafy.moyeobang.payment.application.domain.Payment;
import com.ssafy.moyeobang.payment.application.domain.PaymentReceipt;
import com.ssafy.moyeobang.payment.application.error.InsufficientBalanceException;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.SaveOrdersPort;
import com.ssafy.moyeobang.payment.application.port.out.SaveWithdrawPort;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class OfflinePaymentService implements OfflinePaymentUseCase {

    private final SsePort ssePort;
    private final SaveWithdrawPort saveWithdrawPort;
    private final SaveOrdersPort saveOrdersPort;
    private final MemberAccountRepositoryInPayment memberAccountRepository;
    private final String paymentSystem = "ssafy_bank";

    @Override
    public boolean confirmPayment(OfflinePaymentRequest request) throws InsufficientBalanceException {
        Member member = new Member("test");
        boolean paymentSuccess = processPayment(request);
        if (paymentSuccess) {
            ssePort.sendPaymentSuccess(request.paymentSessionId(), "Payment successfully");
        } else {
            ssePort.sendPaymentFailure(request.paymentSessionId(), "Payment failed");
        }
        return paymentSuccess;
    }


    private boolean processPayment(OfflinePaymentRequest request)
            throws InsufficientBalanceException {
        Payment payment = Payment.of(request.senderAccountNumber(), request.receiverAccountNumber(), request.amount());

        PaymentReceipt paymentReceipt = payment.processPayment(request.paymentSessionId(), request.orders(),
                request.longitude(), request.latitude(),
                request.title());

        saveWithdrawPort.saveWithdraw(paymentReceipt.getWithdraw());

        saveOrdersPort.saveOrders(paymentReceipt.getOrders());

        // TODO : 변경 예정
        return true;
    }
}
