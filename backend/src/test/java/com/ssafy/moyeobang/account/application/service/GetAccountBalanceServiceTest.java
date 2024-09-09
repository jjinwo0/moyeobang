package com.ssafy.moyeobang.account.application.service;

import static com.ssafy.moyeobang.account.application.domain.ActivityWindow.empty;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GetAccountBalanceServiceTest {

    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);

    private final GetAccountBalanceService getAccountBalanceService = new GetAccountBalanceService(loadAccountPort);

    @DisplayName("계좌 번호를 이용하여 계좌 잔액을 조회한다.")
    @Test
    void getAccountBalance() {
        //given
        Account account = Account.of("111", Money.of(10000), empty());

        given(loadAccountPort.loadTravelAccount(any(String.class)))
                .willReturn(account);

        //when
        GetAccountBalanceResponse response = getAccountBalanceService.getAccountBalance(account.getAccountNumber());

        //then
        assertThat(response)
                .extracting("accountNumber", "balance")
                .containsExactlyInAnyOrder("111", 10000L);
    }
}