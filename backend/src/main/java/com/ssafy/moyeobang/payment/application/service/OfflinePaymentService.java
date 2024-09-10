package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.adapter.out.persistence.MemberAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Account;
import com.ssafy.moyeobang.payment.application.domain.Member;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Payment;
import com.ssafy.moyeobang.payment.application.error.InsufficientBalanceException;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class OfflinePaymentService implements OfflinePaymentUseCase {

    private final SsePort ssePort;
    private final MemberAccountRepositoryInPayment memberAccountRepository;
    private final String paymentSystem = "ssafy_bank";

    @Override
    public boolean confirmPayment(OfflinePaymentRequest request) throws InsufficientBalanceException {
        Member member = new Member("test");
        boolean paymentSuccess = processPayment(member.getMemberKey(), request.accountNumber(), request.amount());
        if (paymentSuccess) {
            ssePort.sendPaymentSuccess(request.paymentSessionId(), "Payment successfully");
        } else {
            ssePort.sendPaymentFailure(request.paymentSessionId(), "Payment failed");
        }
        return paymentSuccess;
    }


    private boolean processPayment(long senderAccountId, String receiverAccountId, long amount)
            throws InsufficientBalanceException {
        Account senderAccount = memberAccountRepository.findById(senderAccountId);
        Money money = Money.of(amount);

        Payment payment = Payment.of(senderAccount, receiverAccountId, money);
        payment.processPayment();
    }
}
