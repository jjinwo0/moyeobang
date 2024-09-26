package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import com.ssafy.moyeobang.payment.application.port.out.UpdateMemberBalancePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;


@UseCase
@RequiredArgsConstructor
public class PaymentService implements PaymentUseCase {

    private final SsePort ssePort;
    private final ProcessPaymentPort processPaymentPort;
    private final LoadTravelAccountPort loadTravelAccountPort;
    private final UpdateMemberBalancePort updateMemberBalancePort;

    @Override
    @Transactional
    public boolean confirmPayment(PaymentCommand command) {
        TravelAccount travelAccount = loadTravelAccountPort.loadTravelAccount(command.travelAccountNumber());

        boolean canPayment = !travelAccount.couldNotWithdraw(command.paymentRequestMoney());

        if (!canPayment) {
            ssePort.sendPaymentFailure(command.paymentRequestId(), "Payment failed");
            return false;
        }

        int travelMemberCount = loadTravelAccountPort.loadMemberCount(command.travelAccountNumber());

        Money splitMoney = command.paymentRequestMoney().divide(travelMemberCount);

        updateMemberBalancePort.updateMemberBalances(command.travelAccountNumber(), splitMoney);

        PaymentResult paymentResult = processPaymentPort.processPayment(travelAccount, command.toStoreDomain(),
                command.paymentRequestMoney(), command.paymentRequestId());
        ssePort.sendPaymentSuccess(command.paymentRequestId(), paymentResult);
        return true;
    }
}
