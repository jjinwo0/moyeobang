package com.ssafy.moyeobang.account.application.domain;

import static java.time.LocalDateTime.now;
import static lombok.AccessLevel.PRIVATE;

import com.ssafy.moyeobang.account.error.InsufficientBalanceException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = PRIVATE)
public class Account {

    @Getter
    private final String accountNumber;
    private final Money baselineBalance;
    private final ActivityWindow activityWindow;
    private final Settles settles;

    public static Account of(String accountNumber,
                             Money baselineBalance,
                             ActivityWindow activityWindow) {
        return new Account(accountNumber, baselineBalance, activityWindow, null);
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

    public Money getBalance() {
        return Money.add(
                baselineBalance,
                activityWindow.getNewActivityBalance()
        );
    }

    public Money getBalanceFor(Member member) {
        return Money.add(
                getDepositAmountFor(member),
                getWithdrawAmountFor(member).negate()
        );
    }

    public Money getDepositAmount() {
        return activityWindow.getDepositBalance();
    }

    public Money getDepositAmountFor(Member member) {
        return activityWindow.getDepositBalanceFor(member.getAccountNumber());
    }

    public Money getWithdrawAmount() {
        return activityWindow.getWithdrawalBalance();
    }

    public Money getWithdrawAmountFor(Member member) {
        return settles.getAmountFor(member);
    }

    private boolean couldNotWithdraw(Money money) {
        return !Money.subtract(baselineBalance, money)
                .isPositiveOrZero();
    }
}
