package com.ssafy.moyeobang.account.application.domain;

import static java.time.LocalDateTime.now;
import static lombok.AccessLevel.PRIVATE;

import com.ssafy.moyeobang.account.error.InsufficientBalanceException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = PRIVATE)
public class Account {

    private final String accountNumber;
    private final Money balance;
    private final ActivityWindow activityWindow;

    public static Account of(String accountNumber,
                             Money balance,
                             ActivityWindow activityWindow) {
        return new Account(accountNumber, balance, activityWindow);
    }

    public void deposit(Account sourceAccount, Money money) {
        Activity activity = new Activity(
                this.accountNumber,
                sourceAccount.getAccountNumber(),
                this.accountNumber,
                now(),
                money
        );

        activityWindow.addActivity(activity);
    }

    public void withdraw(Account targetAccount, Money money) {
        if (couldNotWithdraw(money)) {
            throw new InsufficientBalanceException();
        }

        Activity activity = new Activity(
                this.accountNumber,
                this.accountNumber,
                targetAccount.getAccountNumber(),
                now(),
                money
        );

        activityWindow.addActivity(activity);
    }

    public Money getDepositAmount() {
        return activityWindow.getDepositBalance();
    }

    public Money getWithdrawAmount() {
        return activityWindow.getWithdrawalBalance();
    }

    private boolean couldNotWithdraw(Money money) {
        return !Money.subtract(this.getBalance(), money)
                .isPositiveOrZero();
    }
}
