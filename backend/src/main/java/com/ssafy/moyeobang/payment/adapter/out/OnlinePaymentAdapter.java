package com.ssafy.moyeobang.payment.adapter.out;


import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.payment.adapter.out.server.PgApiClientInPayment;
import com.ssafy.moyeobang.payment.application.port.out.ConfirmPaymentPort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class OnlinePaymentAdapter implements ConfirmPaymentPort {

    private final PgApiClientInPayment pgApiClientInPayment;

    @Override
    public void confirmPaymentSuccess(String paymentRequestId) {
        if (!pgApiClientInPayment.confirmPayment(paymentRequestId, true)) {
            throw new PaymentException(ErrorCode.CANT_ACCESS_PG_SERVER);
        }
    }


    @Override
    public void confirmPaymentFailure(String paymentRequestId) {
        if (!pgApiClientInPayment.confirmPayment(paymentRequestId, false)) {
            throw new PaymentException(ErrorCode.CANT_ACCESS_PG_SERVER);
        }
    }
}
