package com.ssafy.moyeobang.account.adapter.out;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.moyeobang.account.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.deposit.DepositRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.travel.TravelRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.HttpClientErrorException;

class BankAccountAdapterTest extends PersistenceAdapterTestSupport {

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
    private DepositRepositoryInAccount depositRepository;

    @AfterEach
    void tearDown() {
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

    @DisplayName("싸피 뱅크 API를 활용하여 개인 계좌 정보를 조회한다.")
    @Test
    void loadMemberAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        MemberAccountJpaEntity memberAccount = createMemberAccountWithInitialDeposit50000(member);

        //when
        Account account = bankAccountAdapter.loadMemberAccount(member.getId());

        //then
        assertThat(account).extracting("accountNumber", "balance")
                .containsExactly(memberAccount.getAccountNumber(), Money.of(50000));
    }

    @DisplayName("싸피 뱅크 API를 활용하여 여행 모임 계좌 정보를 조회한다.")
    @Test
    void loadTravelAccount() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        TravelAccountJpaEntity travelAccount = createTravelAccount(member, travel);

        //when
        Account account = bankAccountAdapter.loadTravelAccount(travelAccount.getAccountNumber());

        //then
        assertThat(account).extracting("accountNumber", "balance")
                .containsExactly(travelAccount.getAccountNumber(), Money.ZERO);
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
}