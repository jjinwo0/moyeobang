package com.ssafy.moyeobang.payment.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.StoreCommand;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import com.ssafy.moyeobang.payment.application.port.out.UpdateMemberBalancePort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class OfflinePaymentServiceTest {

    private final SsePort ssePort = mock(SsePort.class);
    private final ProcessPaymentPort processPaymentPort = mock(ProcessPaymentPort.class);
    private final LoadTravelAccountPort loadTravelAccountPort = mock(LoadTravelAccountPort.class);
    private final UpdateMemberBalancePort updateMemberBalancePort = mock(UpdateMemberBalancePort.class);

    private final OfflinePaymentService offlinePaymentService = new OfflinePaymentService(
            ssePort, processPaymentPort, loadTravelAccountPort, updateMemberBalancePort
    );

    @DisplayName("결제가 성공적으로 이루어지면 SSE 성공 메시지를 보낸다.")
    @Test
    void confirmPaymentSuccess() {
        // Given
        PaymentCommand command = new PaymentCommand(
                "payment-123",
                "account-123",
                new StoreCommand("store-001", "Sample Store", "1234 Address", 37.7749, -122.4194, "target-acc-002"),
                Money.of(10000L)
        );

        TravelAccount travelAccount = new TravelAccount("account-123", Money.of(20000L));

        when(loadTravelAccountPort.loadTravelAccount(any(String.class)))
                .thenReturn(travelAccount);

        when(loadTravelAccountPort.loadMemberCount(any(String.class)))
                .thenReturn(3);

        PaymentResult paymentResult = new PaymentResult(1);
        when(processPaymentPort.processPayment(any(TravelAccount.class), any(Store.class), any(Money.class),
                any(String.class)))
                .thenReturn(paymentResult);

        // When
        boolean result = offlinePaymentService.confirmPayment(command);

        // Then
        verify(loadTravelAccountPort).loadMemberCount(any(String.class));
        assertThat(result).isTrue();
        verify(ssePort).sendPaymentSuccess(eq("payment-123"), any(PaymentResult.class));
    }

    @DisplayName("멤버가 없는 경우 PaymentException이 발생한다.")
    @Test
    void confirmPaymentFailsWhenNoMembers() {
        // Given
        PaymentCommand command = new PaymentCommand(
                "payment-123",
                "account-123",
                new StoreCommand("store-001", "Sample Store", "1234 Address", 37.7749, -122.4194, "target-acc-002"),
                Money.of(10000L)
        );

        TravelAccount travelAccount = new TravelAccount("account-123", Money.of(20000L));

        when(loadTravelAccountPort.loadTravelAccount(any(String.class)))
                .thenReturn(travelAccount);

        // Mocking loadMemberCount to throw PaymentException
        when(loadTravelAccountPort.loadMemberCount(any(String.class)))
                .thenThrow(new PaymentException(ErrorCode.NO_MEMBER_IN_TRAVEL));

        // When & Then
        assertThrows(PaymentException.class, () -> offlinePaymentService.confirmPayment(command));
    }

    @DisplayName("결제가 실패하면 SSE 실패 메시지를 보낸다.")
    @Test
    void confirmPaymentFailure() {
        // Given
        PaymentCommand command = new PaymentCommand(
                "payment-123",
                "account-123",
                new StoreCommand("store-001", "Sample Store", "1234 Address", 37.7749, -122.4194, "target-acc-002"),
                Money.of(30000L)
        );

        TravelAccount travelAccount = new TravelAccount("account-123", Money.of(20000L));

        when(loadTravelAccountPort.loadTravelAccount(any(String.class)))
                .thenReturn(travelAccount);

        // When
        boolean result = offlinePaymentService.confirmPayment(command);

        // Then
        assertThat(result).isFalse();
        verify(ssePort).sendPaymentFailure(eq("payment-123"), any(String.class));
    }
}
