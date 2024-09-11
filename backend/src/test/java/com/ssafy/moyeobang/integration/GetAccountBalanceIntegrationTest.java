package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.get;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.account.adapter.out.BankAccountAdapter;
import com.ssafy.moyeobang.account.adapter.out.bank.BankApiClient;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.deposit.DepositRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.travel.TravelRepositoryInAccount;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyUseCase;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

public class GetAccountBalanceIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private BankApiClient bankApiClient;

    @Autowired
    private BankAccountAdapter bankAccountAdapter;

    @Autowired
    private MemberRepositoryInAccount memberRepository;

    @Autowired
    private MemberAccountRepositoryInAccount memberAccountRepository;

    @Autowired
    private TravelRepositoryInAccount travelRepository;

    @Autowired
    private TravelAccountRepositoryInAccount travelAccountRepository;

    @Autowired
    private DepositRepositoryInAccount depositRepository;

    @Autowired
    private SendMoneyUseCase sendMoneyUseCase;

    @AfterEach
    void tearDown() {
        depositRepository.deleteAllInBatch();
        travelAccountRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
        memberAccountRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
    }

    @DisplayName("모임 통장 공금 잔액 조회 통합 테스트")
    @Test
    void getAccountBalance() {
        //given
        MemberJpaEntity member = createMember();
        memberRepository.save(member);

        TravelJpaEntity travel = createTravel();
        travelRepository.save(travel);

        MemberAccountJpaEntity memberAccount = createMemberAccountWithInitialDeposit50000(member);
        TravelAccountJpaEntity travelAccount = createTravelAccount(member, travel);

        SendMoneyCommand command = new SendMoneyCommand(member.getId(), travelAccount.getAccountNumber(), 50000L);
        sendMoneyUseCase.sendMoney(command);

        //when
        JsonNode response = get(port, "/api/accounts/" + travelAccount.getAccountNumber() + "/balance");

        //then
        assertThat(response.path("data").path("currentBalance").asLong()).isEqualTo(50000L);
        assertThat(response.path("data").path("totalAmount").asLong()).isEqualTo(50000L);
        assertThat(response.path("data").path("totalSpent").asLong()).isEqualTo(0L);
        assertThat(response.path("data").path("usagePercentage").asDouble()).isEqualTo(0.0);
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
