package com.ssafy.moyeobang.account.application.service;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountMemberBalanceResponse;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Activity;
import com.ssafy.moyeobang.account.application.domain.ActivityWindow;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.Settle;
import com.ssafy.moyeobang.account.application.domain.Settles;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
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
        Account travelAccount = createAccount("0016174648358791", 0L);

        Member member1 = new Member(
                1L,
                "김두열1",
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358792"
        );

        Member member2 = new Member(
                2L,
                "김두열1",
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358793"
        );

        Member member3 = new Member(
                3L,
                "김두열1",
                "https://profile-image.url",
                "eea1652c-b5f3-4ef3-9aba-5360026f03b0",
                "0016174648358794"
        );

        given(loadMemberPort.loadMember(1L)).willReturn(member1);
        given(loadMemberPort.loadMember(2L)).willReturn(member2);
        given(loadMemberPort.loadMember(3L)).willReturn(member3);

        given(loadAccountPort.loadAccount("0016174648358791")).willReturn(travelAccount);

        //when
        GetAccountMemberBalanceResponse accountMemberBalance1 = getAccountMemberBalanceService.getAccountMemberBalance(
                "0016174648358791",
                1L
        );

        GetAccountMemberBalanceResponse accountMemberBalance2 = getAccountMemberBalanceService.getAccountMemberBalance(
                "0016174648358791",
                2L
        );

        GetAccountMemberBalanceResponse accountMemberBalance3 = getAccountMemberBalanceService.getAccountMemberBalance(
                "0016174648358791",
                3L
        );

        //then
        assertThat(accountMemberBalance1).extracting("currentBalance", "totalAmount", "totalSpent")
                .containsExactly(40000L, 100000L, 60000L);

        assertThat(accountMemberBalance2).extracting("currentBalance", "totalAmount", "totalSpent")
                .containsExactly(40000L, 100000L, 60000L);

        assertThat(accountMemberBalance3).extracting("currentBalance", "totalAmount", "totalSpent")
                .containsExactly(80000L, 100000L, 20000L);
    }

    private Account createAccount(String accountNumber, Long amount) {
        return Account.of(
                accountNumber,
                Money.of(amount),
                createActivityWindow(accountNumber),
                createSettles()
        );
    }

    private ActivityWindow createActivityWindow(String travelAccountNumber) {
        String memberAccountNumber1 = "0016174648358792";
        String memberAccountNumber2 = "0016174648358793";
        String memberAccountNumber3 = "0016174648358794";

        String storeAccountNumber1 = "0016174648358795";
        String storeAccountNumber2 = "0016174648358796";

        Activity deposit1 = new Activity(travelAccountNumber, memberAccountNumber1, travelAccountNumber, now(), Money.of(100000));
        Activity deposit2 = new Activity(travelAccountNumber, memberAccountNumber2, travelAccountNumber, now(), Money.of(100000));
        Activity deposit3 = new Activity(travelAccountNumber, memberAccountNumber3, travelAccountNumber, now(), Money.of(100000));

        Activity payment1 = new Activity(travelAccountNumber, travelAccountNumber, storeAccountNumber1, now(), Money.of(80000));
        Activity payment2 = new Activity(travelAccountNumber, travelAccountNumber, storeAccountNumber2, now(), Money.of(60000));

        return new ActivityWindow(List.of(deposit1, deposit2, deposit3, payment1, payment2));
    }

    private Settles createSettles() {
        Settle settle1 = new Settle(
                Map.of(
                        1L, Money.of(30000),
                        2L, Money.of(30000),
                        3L, Money.of(20000)
                )
        );

        Settle settle2 = new Settle(
                Map.of(
                        1L, Money.of(30000),
                        2L, Money.of(30000)
                )
        );

        return new Settles(List.of(settle1, settle2));
    }
}