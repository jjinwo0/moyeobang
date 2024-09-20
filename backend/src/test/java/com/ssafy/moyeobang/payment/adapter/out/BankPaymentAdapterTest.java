package com.ssafy.moyeobang.payment.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.out.LoadTravelAccountPort;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

public class BankPaymentAdapterTest extends PersistenceAdapterTestSupport {

    @MockBean
    private LoadTravelAccountPort loadTravelAccountPort;

    @MockBean
    private BankApiClient bankApiClient;

    @MockBean
    private ProcessPaymentPort processPaymentPort;

    @Autowired
    private TravelAccountRepositoryInPayment travelAccountRepository;

    @Autowired
    private WithdrawRepositoryInPayment withdrawRepository;

    private BankPaymentAdapter bankPaymentAdapter;

    @BeforeEach
    void setUp() {
        bankPaymentAdapter = new BankPaymentAdapter(bankApiClient, travelAccountRepository, withdrawRepository);
    }

    @AfterEach
    void tearDown() {
        withdrawRepository.deleteAllInBatch();
    }

    @DisplayName("사용자의 여행 계좌를 로드한다.")
    @Test
    void loadTravelAccount() {
        // given
        String accountNumber = "123-456-789";

        when(bankApiClient.getBalance(accountNumber)).thenReturn(10000L);

        when(loadTravelAccountPort.loadTravelAccount(accountNumber))
                .thenReturn(TravelAccount.of(accountNumber, Money.of(10000L)));

        // when
        TravelAccount travelAccount = bankPaymentAdapter.loadTravelAccount(accountNumber);

        // then
        assertThat(travelAccount.getAccountNumber()).isEqualTo(accountNumber);
        assertThat(travelAccount.getBalance().getAmount()).isEqualTo(10000L);
    }

    @DisplayName("사용자의 계좌로 결제를 처리한다.")
    @Test
    void processPayment() {
        // given
        String accountNumber = "123-456-789";
        Store store = new Store("store-001", "Sample Store", "Sample Address", 37.7749, -122.4194, "store-acc-002");
        Money paymentRequestMoney = Money.of(10000L);

        TravelAccountJpaEntity travelAccountJpaEntity = TravelAccountJpaEntity.builder()
                .accountNumber(accountNumber)
                .build();
        travelAccountRepository.save(travelAccountJpaEntity);

        when(bankApiClient.getBalance(accountNumber)).thenReturn(20000L);

        TravelAccount travelAccount = TravelAccount.of(accountNumber, Money.of(20000L));

        // when
        PaymentResult paymentResult = bankPaymentAdapter.processPayment(
                travelAccount, store, paymentRequestMoney
        );

        // then
        assertThat(paymentResult.money()).isEqualTo(paymentRequestMoney.getAmount());
        assertThat(paymentResult.paymentName()).isEqualTo(store.getStoreName());
        assertThat(paymentResult.address()).isEqualTo(store.getStoreAddress());
    }
}

