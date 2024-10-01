package com.ssafy.moyeobang.payment.adapter.out;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.payment.adapter.out.server.PgApiClientInPayment;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

@ExtendWith(MockitoExtension.class)
public class OnlinePaymentAdapterTest {

    @Mock
    private PgApiClientInPayment pgApiClientInPayment;

    @InjectMocks
    private OnlinePaymentAdapter onlinePaymentAdapter;

    @Value("${pg.api.url}")
    private String pgUrl;

    @DisplayName("결제가 성공하면, 성공 메시지를 반환해야한다")
    @Test
    public void confirmPaymentSuccess() {
        // Given
        String paymentRequestId = "testRequestId";
        when(pgApiClientInPayment.confirmPayment(pgUrl, paymentRequestId, true)).thenReturn(true);

        // When
        onlinePaymentAdapter.confirmPaymentSuccess(paymentRequestId);

        // Then
        verify(pgApiClientInPayment, times(1)).confirmPayment(pgUrl, paymentRequestId, true);
    }

    @DisplayName("결제가 실패하면, 결제 예외를 발생시켜야 한다")
    @Test
    public void confirmPaymentFailure() {
        // Given
        String paymentRequestId = "testRequestId";
        when(pgApiClientInPayment.confirmPayment(pgUrl, paymentRequestId, true)).thenReturn(false);

        // When
        PaymentException exception = assertThrows(PaymentException.class, () -> {
            onlinePaymentAdapter.confirmPaymentSuccess(paymentRequestId);
        });

        // Then
        assertEquals(ErrorCode.CANT_ACCESS_PG_SERVER, exception.getErrorCode());
    }
}

