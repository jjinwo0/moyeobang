package com.ssafy.moyeobang.payment.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.bank.BankApiClientInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travel.TravelRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount.TravelAccountRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@Disabled
public class BankPaymentAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private BankApiClientInPayment bankApiClientInPayment;

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
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }


    @DisplayName("방장의 유저 키를 이용해 싸피 뱅크 여행 모임 통장 계좌를 생성한다.")
    @Test
    void createAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);
        //when
        String accountNumber = bankPaymentAdapter.createAccount(member.getMemberKey());

        //then
        assertThat(accountNumber).hasSize(16);
    }

    @DisplayName("사용자의 여행 모임 통장 계좌를 로드한다.")
    @Test
    void loadTravelAccount() {
        // given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity newTravelAccount = createTravelAccount(member, travel);

        String accountNumber = newTravelAccount.getAccountNumber();

        Long balance = bankApiClientInPayment.getBalance(accountNumber);

        // when
        TravelAccount resultTravelAccount = bankPaymentAdapter.loadTravelAccount(accountNumber);

        // then
        assertThat(resultTravelAccount.getAccountNumber()).isEqualTo(accountNumber);
        assertThat(resultTravelAccount.getBalance().getAmount()).isEqualTo(balance);
    }

    @DisplayName("사용자의 여행 모임 계좌로 결제를 처리한다.")
    @Test
    void processPayment() {
        // given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccountJpaEntity = createTravelAccount(member, travel);
        travelAccountRepository.save(travelAccountJpaEntity);

        String accountNumber = travelAccountJpaEntity.getAccountNumber();

        Long balance = bankApiClientInPayment.getBalance(accountNumber);
        TravelAccount travelAccount = TravelAccount.of(accountNumber, Money.of(balance));

        Store store = new Store("store-001", "Sample Store", "Sample Address", 37.7749, -122.4194, "store-acc-002");
        Money paymentRequestMoney = Money.of(10000L);

        // when
        PaymentResult paymentResult = bankPaymentAdapter.processPayment(
                travelAccount, store, paymentRequestMoney
        );

        // then
        WithdrawJpaEntity savedWithdraw = withdrawRepository.findById(paymentResult.transactionId())
                .orElseThrow(() -> new AssertionError("Withdraw entity not found"));

        assertThat(paymentResult.transactionId()).isEqualTo(savedWithdraw.getId());
    }

    private TravelAccountJpaEntity createTravelAccount(MemberJpaEntity member, TravelJpaEntity travel) {
        String travelAccountNumber = bankApiClientInPayment.createAccount(member.getMemberKey());

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
                .memberKey("596d1e36-c34a-4bbe-9abd-a329decc19e7")
                .build();
    }

    private TravelJpaEntity createTravel() {
        return TravelJpaEntity.builder()
                .title("아기돼지 여행")
                .build();
    }
}

