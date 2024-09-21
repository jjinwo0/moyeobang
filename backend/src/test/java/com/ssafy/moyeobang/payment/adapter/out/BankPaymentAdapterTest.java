package com.ssafy.moyeobang.payment.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travel.TravelRepositoryInPayment;
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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class BankPaymentAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private LoadTravelAccountPort loadTravelAccountPort;

    @Autowired
    private BankApiClient bankApiClient;

    @Autowired
    private ProcessPaymentPort processPaymentPort;

    @Autowired
    private MemberRepositoryInPayment memberRepository;

    @Autowired
    private TravelRepositoryInPayment travelRepository;

    @Autowired
    private TravelAccountRepositoryInPayment travelAccountRepository;

    @Autowired
    private WithdrawRepositoryInPayment withdrawRepository;

    @Autowired
    private BankPaymentAdapter bankPaymentAdapter;


    @AfterEach
    void tearDown() {
        withdrawRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        withdrawRepository.deleteAllInBatch();
    }

    @DisplayName("사용자의 여행 계좌를 로드한다.")
    @Test
    void loadTravelAccount() {
        // given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity newTravelAccount = createTravelAccount(member, travel);

        String accountNumber = newTravelAccount.getAccountNumber();

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

    private TravelAccountJpaEntity createTravelAccount(MemberJpaEntity member, TravelJpaEntity travel) {
        String travelAccountNumber = bankApiClient.createAccount(member.getMemberKey());

        return createTravelAccount(travelAccountNumber, travel);
    }

    private TravelAccountJpaEntity createTravelAccount(String travelAccountNumber, TravelJpaEntity travel) {
        return TravelAccountJpaEntity.builder()
                .accountNumber(travelAccountNumber)
                .travel(travel)
                .build();
    }

    private MemberJpaEntity createMember() {
        return MemberJpaEntity.builder()
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();
    }

    private TravelJpaEntity createTravel() {
        return TravelJpaEntity.builder()
                .title("아기돼지 여행")
                .build();
    }
}

