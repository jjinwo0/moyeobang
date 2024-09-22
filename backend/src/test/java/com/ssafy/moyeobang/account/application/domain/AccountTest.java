package com.ssafy.moyeobang.account.application.domain;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AccountTest {

    @DisplayName("통장에 돈을 입금한다.")
    @Test
    void deposit() {
        //given
        Account sourceAccount = createAccount("0016174648358791", 10000L);
        Account targetAccount = createAccount("0016174648358792", 0L);

        //when
        targetAccount.deposit(sourceAccount, Money.of(5000));

        //then
        assertThat(targetAccount.getBalance()).isEqualTo(Money.of(5000));
    }

    @DisplayName("통장에서 돈을 출금한다.")
    @Test
    void withdraw() {
        //given
        Account sourceAccount = createAccount("0016174648358791", 10000L);
        Account targetAccount = createAccount("0016174648358792", 0L);

        //when
        sourceAccount.withdraw(targetAccount, Money.of(5000));

        //then
        assertThat(sourceAccount.getBalance()).isEqualTo(Money.of(5000));
    }

    @DisplayName("잔액을 계산한다.")
    @Test
    void getBalance() {
        //given
        Account account = createAccountWithActivityWindow("111", 10000L);

        //when
        Money balance = account.getBalance();

        //then
        assertThat(balance).isEqualTo(Money.of(12000));
    }

    private Account createAccount(String accountNumber, Long amount) {
        return Account.of(accountNumber, Money.of(amount), new ActivityWindow(new ArrayList<>()), new Settles(new ArrayList<>()));
    }

    private Account createAccountWithActivityWindow(String accountNumber, Long amount) {
        Activity activity1 = createActivity("111", "111", "222", Money.of(5000));
        Activity activity2 = createActivity("111", "333", "111", Money.of(10000));
        Activity activity3 = createActivity("111", "111", "444", Money.of(3000));

        return Account.of(accountNumber, Money.of(amount), new ActivityWindow(List.of(activity1, activity2, activity3)),
                new Settles(new ArrayList<>()));
    }

    private static Activity createActivity(String ownerAccountNumber,
                                           String sourceAccountNumber,
                                           String targetAccountNumber,
                                           Money money) {
        return new Activity(ownerAccountNumber, sourceAccountNumber, targetAccountNumber, now(), money);
    }
}