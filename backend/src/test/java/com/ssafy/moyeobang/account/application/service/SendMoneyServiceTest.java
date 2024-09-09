package com.ssafy.moyeobang.account.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.ActivityWindow;
import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.account.error.InsufficientBalanceException;
import java.util.ArrayList;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class SendMoneyServiceTest {

    private final LoadAccountPort loadAccountPort = mock(LoadAccountPort.class);
    private final SendMoneyPort sendMoneyPort = mock(SendMoneyPort.class);

    private final SendMoneyService sendMoneyService = new SendMoneyService(loadAccountPort, sendMoneyPort);

    @DisplayName("개인 계좌에서 모임 통장 계좌로 돈을 송금한다.")
    @Test
    void sendMoney() {
        //given
        Account memberAccount = createAccount("0016174648358791", 10000L);
        Account travelAccount = createAccount("0016174648358792", 0L);

        given(loadAccountPort.loadMemberAccount(any(Long.class))).willReturn(memberAccount);
        given(loadAccountPort.loadTravelAccount(any(String.class))).willReturn(travelAccount);

        SendMoneyCommand command = new SendMoneyCommand(1L, "0016174648358792", 3000L);

        //when
        sendMoneyService.sendMoney(command);

        //then
        assertThat(memberAccount.getBalance()).isEqualTo(Money.of(7000));
        assertThat(travelAccount.getBalance()).isEqualTo(Money.of(3000));
    }

    @DisplayName("돈을 송금할 때 잔액이 부족한 경우 예외가 발생한다.")
    @Test
    void sendMoneyWithInsufficientBalance() {
        //given
        Account memberAccount = createAccount("0016174648358791", 10000L);
        Account travelAccount = createAccount("0016174648358792", 0L);

        given(loadAccountPort.loadMemberAccount(any(Long.class))).willReturn(memberAccount);
        given(loadAccountPort.loadTravelAccount(any(String.class))).willReturn(travelAccount);

        SendMoneyCommand command = new SendMoneyCommand(1L, "0016174648358792", 10001L);

        //when & then
        assertThatThrownBy(() -> sendMoneyService.sendMoney(command)).isInstanceOf(InsufficientBalanceException.class);
    }

    private Account createAccount(String accountNumber, Long amount) {
        return Account.of(accountNumber, Money.of(amount), new ActivityWindow(new ArrayList<>()));
    }
}