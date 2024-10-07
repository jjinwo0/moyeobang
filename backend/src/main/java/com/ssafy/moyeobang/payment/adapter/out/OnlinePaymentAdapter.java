package com.ssafy.moyeobang.payment.adapter.out;


import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.payment.adapter.out.server.PgApiClientInPayment;
import com.ssafy.moyeobang.payment.application.port.out.ConfirmPaymentPort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@PersistenceAdapter
@RequiredArgsConstructor
public class OnlinePaymentAdapter implements ConfirmPaymentPort {

    private final PgApiClientInPayment pgApiClientInPayment;

    @Value("${pg.api.url}")
    private String pgUrl;

    @Override
    public void confirmPaymentSuccess(String paymentRequestId) {
        if (!pgApiClientInPayment.confirmPayment(pgUrl, paymentRequestId, true)) {
            throw new PaymentException(ErrorCode.CANT_ACCESS_PG_SERVER);
        }
    }


    @Override
    public void confirmPaymentFailure(String paymentRequestId) {
        if (!pgApiClientInPayment.confirmPayment(pgUrl, paymentRequestId, false)) {
            throw new PaymentException(ErrorCode.CANT_ACCESS_PG_SERVER);
        }
    }
}
