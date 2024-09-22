package com.ssafy.moyeobang.account.application.service;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoryResponse;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Deposit;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Members;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settle;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settles;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transaction;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transactions;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GetTransactionHistoryServiceTest {

    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);

    private final GetTransactionHistoryService getTransactionHistoryService = new GetTransactionHistoryService(loadAccountPort);

    @DisplayName("모임 통장에서 계좌 이체 내역을 상세 조회한다.")
    @Test
    void getTransactionHistory() {
        //given
        Member member1 = createMember(1L, "김두열");
        Member member2 = createMember(2L, "김훈민");
        Member member3 = createMember(3L, "박진우");
        Members members = new Members(
                Map.of(
                        1L, member1,
                        2L, member2,
                        3L, member3
                )
        );

        Transaction transaction1 = createDeposit(member1);
        Transaction transaction2 = createWithdrawal1(members);
        Transaction transaction3 = createWithdrawal2(members);
        Transactions transactions = new Transactions(List.of(transaction1, transaction2, transaction3));

        TravelAccount travelAccount = new TravelAccount("111", members, transactions);

        given(loadAccountPort.loadTravelAccount(any(Long.class)))
                .willReturn(travelAccount);

        //when
        GetTransactionHistoryResponse transactionHistory = getTransactionHistoryService.getTransactionHistory(1L, 3L);

        //then
        assertThat(transactionHistory)
                .extracting("paymentName", "address", "totalPrice")
                .containsExactly(
                        "다복식당", "광주 광역시 수완동", 50000L
                );
    }

    private Member createMember(Long id, String name) {
        return new Member(
                id,
                name,
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358792"
        );
    }

    private Transaction createDeposit(Member member) {
        return Deposit.builder()
                .transactionId(1L)
                .transactionAccountNumber("111")
                .timestamp(now())
                .money(Money.of(100000))
                .balanceSnapshot(Money.of(100000))
                .depositMember(member)
                .build();
    }

    private Transaction createWithdrawal1(Members members) {
        Settle settle = new Settle(
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
                .balanceSnapshot(Money.of(70000))
                .title("스타벅스")
                .address("광주 광역시 수완동")
                .settleType("CUSTOM")
                .settles(new Settles(List.of(settle)))
                .build();
    }

    private Transaction createWithdrawal2(Members members) {
        Settle settle = new Settle(
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
                .balanceSnapshot(Money.of(20000))
                .title("다복식당")
                .address("광주 광역시 수완동")
                .settleType("RECEIPT")
                .settles(new Settles(List.of(settle)))
                .build();
    }
}