package com.ssafy.moyeobang.account.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.moyeobang.account.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.deposit.DepositRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberOrderHistoryRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberTravelRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.order.OrderRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.travel.TravelRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.withdraw.WithdrawRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

@Transactional
class BankAccountAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private BankAccountAdapter bankAccountAdapter;

    @Autowired
    private BankApiClient bankApiClient;

    @Autowired
    private TravelRepositoryInAccount travelRepository;

    @Autowired
    private TravelAccountRepositoryInAccount travelAccountRepository;

    @Autowired
    private MemberRepositoryInAccount memberRepository;

    @Autowired
    private MemberAccountRepositoryInAccount memberAccountRepository;

    @Autowired
    private MemberTravelRepositoryInAccount memberTravelRepository;

    @Autowired
    private DepositRepositoryInAccount depositRepository;

    @Autowired
    private WithdrawRepositoryInAccount withdrawRepository;

    @Autowired
    private OrderRepositoryInAccount orderRepository;

    @Autowired
    private MemberOrderHistoryRepositoryInAccount memberOrderHistoryRepository;

    @AfterEach
    void tearDown() {
        memberTravelRepository.deleteAllInBatch();
        memberOrderHistoryRepository.deleteAllInBatch();
        orderRepository.deleteAllInBatch();
        withdrawRepository.deleteAllInBatch();
        depositRepository.deleteAllInBatch();
        memberAccountRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("방장의 유저 키를 이용해 싸피 뱅크 모임 통장 계좌를 생성한다.")
    @Test
    void createAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        //when
        String accountNumber = bankAccountAdapter.createAccount(member.getMemberKey());

        //then
        assertThat(accountNumber).hasSize(16);
    }

    @DisplayName("잘못된 유저 키를 이용할 경우 계좌를 생성하지 못하고 예외가 발생한다.")
    @Test
    void createAccountWithWrongMemberKey() {
        //given
        MemberJpaEntity member = createMemberWithWrongMemberKey();
        memberRepository.save(member);

        //when & then
        assertThatThrownBy(() -> bankAccountAdapter.createAccount(member.getMemberKey()))
                .isInstanceOf(HttpClientErrorException.class);
    }

    @DisplayName("싸피 뱅크 API를 활용하여 여행 모임 계좌 정보를 조회한다.")
    @Test
    void loadAccount() {
        //given
        MemberJpaEntity member1 = createMember();
        MemberJpaEntity member2 = createMember();
        memberRepository.saveAll(List.of(member1, member2));

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccount = createTravelAccount(member1, travel);
        travelAccountRepository.save(travelAccount);

        WithdrawJpaEntity withdraw = createWithdraw(travelAccount);
        withdrawRepository.save(withdraw);

        OrderJpaEntity order1 = createOrder("스초생", 37000, withdraw);
        OrderJpaEntity order2 = createOrder("아이스 아메리카노 2잔", 9000, withdraw);
        orderRepository.saveAll(List.of(order1, order2));

        MemberOrderHistoryJpaEntity history1 = createOrderHistory(20000, member1, order1);
        MemberOrderHistoryJpaEntity history2 = createOrderHistory(17000, member2, order1);
        MemberOrderHistoryJpaEntity history3 = createOrderHistory(4500, member1, order2);
        MemberOrderHistoryJpaEntity history4 = createOrderHistory(4500, member2, order2);
        memberOrderHistoryRepository.saveAll(List.of(history1, history2, history3, history4));

        entityManager.clear();

        Member member = new Member(
                member1.getId(),
                "김두열",
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358791"
        );

        //when
        Account account = bankAccountAdapter.loadAccount(travelAccount.getAccountNumber());

        //then
        assertThat(account).extracting("accountNumber", "balance")
                .containsExactly(travelAccount.getAccountNumber(), Money.ZERO);

        assertThat(account.getWithdrawAmountFor(member)).isEqualTo(Money.of(24500));
    }

    @DisplayName("싸피 뱅크 API를 활용하여 여행 모임 계좌 정보를 조회한다.")
    @Test
    void loadTravelAccount() {
        //given
        MemberJpaEntity member1 = createMember();
        MemberJpaEntity member2 = createMember();
        memberRepository.saveAll(List.of(member1, member2));

        MemberAccountJpaEntity memberAccount1 = createMemberAccount("111", member1);
        MemberAccountJpaEntity memberAccount2 = createMemberAccount("222", member2);
        memberAccountRepository.saveAll(List.of(memberAccount1, memberAccount2));

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        MemberTravelJpaEntity memberTravel1 = createMemberTravel(travel, member1);
        MemberTravelJpaEntity memberTravel2 = createMemberTravel(travel, member2);
        memberTravelRepository.saveAll(List.of(memberTravel1, memberTravel2));

        TravelAccountJpaEntity travelAccountJpaEntity = createTravelAccount(member1, travel);
        travelAccountRepository.save(travelAccountJpaEntity);

        DepositJpaEntity deposit = createDeposit(travelAccountJpaEntity, member1);
        depositRepository.save(deposit);

        WithdrawJpaEntity withdraw = createWithdraw(travelAccountJpaEntity);
        withdrawRepository.save(withdraw);

        OrderJpaEntity order1 = createOrder("스초생", 37000, withdraw);
        OrderJpaEntity order2 = createOrder("아이스 아메리카노 2잔", 9000, withdraw);
        orderRepository.saveAll(List.of(order1, order2));

        MemberOrderHistoryJpaEntity history1 = createOrderHistory(20000, member1, order1);
        MemberOrderHistoryJpaEntity history2 = createOrderHistory(17000, member2, order1);
        MemberOrderHistoryJpaEntity history3 = createOrderHistory(4500, member1, order2);
        MemberOrderHistoryJpaEntity history4 = createOrderHistory(4500, member2, order2);
        memberOrderHistoryRepository.saveAll(List.of(history1, history2, history3, history4));

        entityManager.clear();

        //when
        TravelAccount travelAccount = bankAccountAdapter.loadTravelAccount(travelAccountJpaEntity.getId());

        //then
        assertThat(travelAccount.getBalance()).isEqualTo(Money.of(54000));
    }

    @DisplayName("싸피 뱅크 API를 활용하여 개인 계좌에서 여행 모임 계좌로 돈을 송금한다.")
    @Test
    void sendMoney() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        MemberAccountJpaEntity memberAccount = createMemberAccountWithInitialDeposit50000(member);
        TravelAccountJpaEntity travelAccount = createTravelAccount(member, travel);

        //when
        bankAccountAdapter.sendMoney(
                memberAccount.getAccountNumber(),
                travelAccount.getAccountNumber(),
                Money.of(10000)
        );

        //then
        assertThat(bankApiClient.getBalance(memberAccount.getAccountNumber())).isEqualTo(40000L);
        assertThat(bankApiClient.getBalance(travelAccount.getAccountNumber())).isEqualTo(10000L);
    }

    private MemberAccountJpaEntity createMemberAccountWithInitialDeposit50000(MemberJpaEntity member) {
        String memberAccountNumber = bankApiClient.createAccount(member.getMemberKey());
        MemberAccountJpaEntity memberAccount = createMemberAccount(memberAccountNumber, member);
        memberAccountRepository.save(memberAccount);

        bankApiClient.deposit(memberAccountNumber, 50000L);

        return memberAccount;
    }

    private TravelAccountJpaEntity createTravelAccount(MemberJpaEntity member, TravelJpaEntity travel) {
        String travelAccountNumber = bankAccountAdapter.createAccount(member.getMemberKey());

        return createTravelAccount(travelAccountNumber, travel);
    }

    private MemberJpaEntity createMember() {
        return MemberJpaEntity.builder()
                .memberKey("eea1652c-b5f3-4ef3-9aba-5360026f03b0")
                .build();
    }

    private MemberJpaEntity createMemberWithWrongMemberKey() {
        return MemberJpaEntity.builder()
                .memberKey("wrong member key")
                .build();
    }

    private MemberAccountJpaEntity createMemberAccount(String accountNumber, MemberJpaEntity member) {
        return MemberAccountJpaEntity.builder()
                .bankName("싸피 뱅크")
                .accountNumber(accountNumber)
                .member(member)
                .build();
    }

    private TravelJpaEntity createTravel() {
        return TravelJpaEntity.builder()
                .title("아기돼지 여행")
                .build();
    }

    private TravelAccountJpaEntity createTravelAccount(String travelAccountNumber, TravelJpaEntity travel) {
        return TravelAccountJpaEntity.builder()
                .accountNumber(travelAccountNumber)
                .travel(travel)
                .build();
    }

    private MemberTravelJpaEntity createMemberTravel(TravelJpaEntity travel, MemberJpaEntity member1) {
        return MemberTravelJpaEntity.builder()
                .travel(travel)
                .member(member1)
                .build();
    }

    private DepositJpaEntity createDeposit(TravelAccountJpaEntity travelAccount, MemberJpaEntity member) {
        return DepositJpaEntity.builder()
                .amount(100000)
                .balanceSnapshot(100000)
                .travelAccount(travelAccount)
                .member(member)
                .build();
    }

    private WithdrawJpaEntity createWithdraw(TravelAccountJpaEntity travelAccount) {
        return WithdrawJpaEntity.builder()
                .title("투썸플레이스")
                .amount(46000)
                .travelAccount(travelAccount)
                .build();
    }

    private OrderJpaEntity createOrder(String title, int amount, WithdrawJpaEntity withdraw) {
        return OrderJpaEntity.builder()
                .title(title)
                .amount(amount)
                .withdraw(withdraw)
                .build();
    }

    private MemberOrderHistoryJpaEntity createOrderHistory(int amount, MemberJpaEntity member, OrderJpaEntity order) {
        return MemberOrderHistoryJpaEntity.builder()
                .amount(amount)
                .member(member)
                .order(order)
                .build();
    }
}