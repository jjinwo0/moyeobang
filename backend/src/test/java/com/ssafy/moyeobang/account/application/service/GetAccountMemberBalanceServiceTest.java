package com.ssafy.moyeobang.account.application.service;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountMemberBalanceResponse;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Deposit;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Members;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transaction;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transactions;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GetAccountMemberBalanceServiceTest {

    private final LoadMemberPort loadMemberPort = mock(LoadMemberPort.class);
    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);

    private final GetAccountMemberBalanceService getAccountMemberBalanceService =
            new GetAccountMemberBalanceService(loadMemberPort, loadAccountPort);

    @DisplayName("모임 통장 계좌에서 각 멤버별 잔액을 조회한다.")
    @Test
    void getAccountMemberBalance() {
        //given
        Member member1 = createMember(1L, "김두열", "0016174648358791");
        Member member2 = createMember(2L, "김훈민", "0016174648358792");
        Member member3 = createMember(3L, "박진우", "0016174648358793");
        Members members = new Members(
                Map.of(
                        1L, member1,
                        2L, member2,
                        3L, member3
                )
        );

        Transaction transaction1 = createDeposit(member1);
        Transaction transaction2 = createDeposit(member2);
        Transaction transaction3 = createDeposit(member3);
        Transaction transaction4 = createWithdrawal1(members);
        Transaction transaction5 = createWithdrawal2(members);
        Transactions transactions = new Transactions(transactions(transaction1, transaction2, transaction3, transaction4, transaction5));

        TravelAccount travelAccount = new TravelAccount("0016174648358790", members, transactions);

        given(loadMemberPort.loadMember(1L)).willReturn(member1);
        given(loadMemberPort.loadMember(2L)).willReturn(member2);
        given(loadMemberPort.loadMember(3L)).willReturn(member3);
        given(loadAccountPort.loadTravelAccount(any(Long.class))).willReturn(travelAccount);

        //when
        GetAccountMemberBalanceResponse accountMemberBalance1 = getAccountMemberBalanceService.getAccountMemberBalance(
                1L,
                1L
        );

        GetAccountMemberBalanceResponse accountMemberBalance2 = getAccountMemberBalanceService.getAccountMemberBalance(
                1L,
                2L
        );

        GetAccountMemberBalanceResponse accountMemberBalance3 = getAccountMemberBalanceService.getAccountMemberBalance(
                1L,
                3L
        );

        //then
        assertThat(accountMemberBalance1).extracting("personalCurrentBalance", "personalTotalAmount", "personalTotalSpent")
                .containsExactly(70000L, 100000L, 30000L);

        assertThat(accountMemberBalance2).extracting("personalCurrentBalance", "personalTotalAmount", "personalTotalSpent")
                .containsExactly(60000L, 100000L, 40000L);

        assertThat(accountMemberBalance3).extracting("personalCurrentBalance", "personalTotalAmount", "personalTotalSpent")
                .containsExactly(90000L, 100000L, 10000L);
    }

    private Member createMember(Long id, String name, String accountNumber) {
        return new Member(
                id,
                name,
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                accountNumber
        );
    }

    private Transaction createDeposit(Member member) {
        return Deposit.builder()
                .transactionAccountNumber(member.getAccountNumber())
                .timestamp(now())
                .money(Money.of(100000))
                .balanceSnapshot(Money.of(100000))
                .depositMember(member)
                .build();
    }

    private Transaction createWithdrawal1(Members members) {
        com.ssafy.moyeobang.account.application.domain.travelaccount.Settle settle = new com.ssafy.moyeobang.account.application.domain.travelaccount.Settle(
                1L,
                "케잌",
                Map.of(
                        members.getMember(1L), Money.of(10000),
                        members.getMember(2L), Money.of(10000),
                        members.getMember(3L), Money.of(10000)
                )
        );

        return Withdrawal.builder()
                .transactionId(2L)
                .transactionAccountNumber("222")
                .timestamp(now())
                .money(Money.of(30000))
                .balanceSnapshot(Money.of(270000))
                .title("스타벅스")
                .address("광주 광역시 수완동")
                .settleType("CUSTOM")
                .settles(new com.ssafy.moyeobang.account.application.domain.travelaccount.Settles(List.of(settle)))
                .build();
    }

    private Transaction createWithdrawal2(Members members) {
        com.ssafy.moyeobang.account.application.domain.travelaccount.Settle settle = new com.ssafy.moyeobang.account.application.domain.travelaccount.Settle(
                2L,
                "김치찌개",
                Map.of(
                        members.getMember(1L), Money.of(20000),
                        members.getMember(2L), Money.of(30000)
                )
        );

        return Withdrawal.builder()
                .transactionId(3L)
                .transactionAccountNumber("333")
                .timestamp(now())
                .money(Money.of(50000))
                .balanceSnapshot(Money.of(220000))
                .title("다복식당")
                .address("광주 광역시 수완동")
                .settleType("RECEIPT")
                .settles(new com.ssafy.moyeobang.account.application.domain.travelaccount.Settles(List.of(settle)))
                .build();
    }

    private List<Transaction> transactions(Transaction... transactions) {
        List<Transaction> transactionList = new ArrayList<>();

        for (Transaction transaction : transactions) {
            transactionList.add(transaction);
        }

        return transactionList;
    }
}