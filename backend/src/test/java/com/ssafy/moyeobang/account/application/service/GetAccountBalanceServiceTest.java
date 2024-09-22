package com.ssafy.moyeobang.account.application.service;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Activity;
import com.ssafy.moyeobang.account.application.domain.ActivityWindow;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.Settles;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GetAccountBalanceServiceTest {

    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);

    private final GetAccountBalanceService getAccountBalanceService = new GetAccountBalanceService(loadAccountPort);

    @DisplayName("계좌 번호를 이용하여 계좌 잔액을 조회한다.")
    @Test
    void getAccountBalance() {
        //given
        Activity activity1 = createActivity("333", "111", 10000L);
        Activity activity2 = createActivity("111", "222", 5000L);
        Activity activity3 = createActivity("111", "333", 2000L);

        ActivityWindow activityWindow = new ActivityWindow(List.of(activity1, activity2, activity3));

        Account account = Account.of("111", Money.ZERO, activityWindow, new Settles(new ArrayList<>()));

        given(loadAccountPort.loadAccount(any(String.class)))
                .willReturn(account);

        //when
        GetAccountBalanceResponse response = getAccountBalanceService.getAccountBalance(account.getAccountNumber());

        //then
        assertThat(response)
                .extracting("currentBalance", "totalAmount", "totalSpent", "usagePercentage")
                .containsExactly(3000L, 10000L, 7000L, 70.0);
    }

    private Activity createActivity(String sourceAccountNumber, String targetAccountNumber, Long amount) {
        return new Activity("111", sourceAccountNumber, targetAccountNumber, now(), Money.of(amount));
    }
}