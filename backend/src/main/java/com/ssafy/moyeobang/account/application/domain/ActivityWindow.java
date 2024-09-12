package com.ssafy.moyeobang.account.application.domain;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ActivityWindow {

    private final List<Activity> activities;

    public void addActivity(Activity activity) {
        this.activities.add(activity);
    }

    public Money getNewActivityBalance() {
        Money deposit = getDepositActivities().stream()
                .filter(Activity::isNew)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);

        Money withdrawal = getWithdrawalActivities().stream()
                .filter(Activity::isNew)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);

        return Money.add(deposit, withdrawal.negate());
    }

    public Money getDepositBalance() {
        return getDepositActivities().stream()
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public Money getDepositBalanceFor(String accountNumber) {
        return getDepositActivities().stream()
                .filter(activity -> activity.verifyDepositBy(accountNumber))
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public Money getWithdrawalBalance() {
        return getWithdrawalActivities().stream()
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    private List<Activity> getDepositActivities() {
        return activities.stream()
                .filter(Activity::isDeposit)
                .toList();
    }

    private List<Activity> getWithdrawalActivities() {
        return activities.stream()
                .filter(Activity::isWithdrawal)
                .toList();
    }
}