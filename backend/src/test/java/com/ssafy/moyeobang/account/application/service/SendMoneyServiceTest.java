package com.ssafy.moyeobang.account.application.service;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Deposit;
import com.ssafy.moyeobang.account.application.domain.travelaccount.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Members;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settle;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Settles;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transaction;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transactions;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.account.error.InsufficientBalanceException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SendMoneyServiceTest {

    private final LoadMemberPort loadMemberPort = mock(LoadMemberPort.class);
    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);
    private final SendMoneyPort sendMoneyPort = mock(SendMoneyPort.class);

    private final SendMoneyService sendMoneyService = new SendMoneyService(loadMemberPort, loadAccountPort, sendMoneyPort);

    @DisplayName("개인 계좌에서 모임 통장 계좌로 돈을 송금한다.")
    @Test
    void sendMoney() {
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
        Transaction transaction2 = createWithdrawal1(members);
        Transaction transaction3 = createWithdrawal2(members);
        Transactions transactions = new Transactions(transactions(transaction1, transaction2, transaction3));

        MemberAccount memberAccount = new MemberAccount(member1.getAccountNumber(), Money.of(10000));
        TravelAccount travelAccount = new TravelAccount("0016174648358790", members, transactions);

        given(loadMemberPort.loadMember(any(Long.class))).willReturn(member1);

        given(loadAccountPort.loadMemberAccount(any(String.class))).willReturn(memberAccount);
        given(loadAccountPort.loadTravelAccount(any(Long.class))).willReturn(travelAccount);

        SendMoneyCommand command = new SendMoneyCommand(1L, 1L, 3000L);

        //when
        sendMoneyService.sendMoney(command);

        //then
        assertThat(travelAccount.getBalance()).isEqualTo(Money.of(23000));
    }

    @DisplayName("돈을 송금할 때 잔액이 부족한 경우 예외가 발생한다.")
    @Test
    void sendMoneyWithInsufficientBalance() {
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
        Transaction transaction2 = createWithdrawal1(members);
        Transaction transaction3 = createWithdrawal2(members);
        Transactions transactions = new Transactions(transactions(transaction1, transaction2, transaction3));

        MemberAccount memberAccount = new MemberAccount(member1.getAccountNumber(), Money.of(10000));
        TravelAccount travelAccount = new TravelAccount("0016174648358790", members, transactions);

        given(loadMemberPort.loadMember(any(Long.class))).willReturn(member1);

        given(loadAccountPort.loadMemberAccount(any(String.class))).willReturn(memberAccount);
        given(loadAccountPort.loadTravelAccount(any(Long.class))).willReturn(travelAccount);

        SendMoneyCommand command = new SendMoneyCommand(1L, 1L, 10001L);

        //when & then
        assertThatThrownBy(() -> sendMoneyService.sendMoney(command)).isInstanceOf(InsufficientBalanceException.class);
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

    private List<Transaction> transactions(Transaction... transactions) {
        List<Transaction> transactionList = new ArrayList<>();

        for (Transaction transaction : transactions) {
            transactionList.add(transaction);
        }

        return transactionList;
    }
}