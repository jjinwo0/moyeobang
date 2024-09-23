package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class OfflinePaymentService implements OfflinePaymentUseCase {

    private final SsePort ssePort;
    private final ProcessPaymentPort processPaymentPort;
    private final LoadTravelAccountPort loadTravelAccountPort;

    @Override
    public boolean confirmPayment(PaymentCommand command) {
        TravelAccount travelAccount = loadTravelAccountPort.loadTravelAccount(command.travelAccountNumber());

        boolean canPayment = !travelAccount.couldNotWithdraw(command.paymentRequestMoney());

        if (!canPayment) {
            ssePort.sendPaymentFailure(command.paymentRequestId(), "Payment failed");
            return false;
        }

        PaymentResult paymentResult = processPaymentPort.processPayment(travelAccount, command.store(),
                command.paymentRequestMoney());
        ssePort.sendPaymentSuccess(command.paymentRequestId(), paymentResult);
        return true;
    }
}
