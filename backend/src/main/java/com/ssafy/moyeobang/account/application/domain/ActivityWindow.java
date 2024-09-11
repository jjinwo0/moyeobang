package com.ssafy.moyeobang.account.application.domain;

import java.util.ArrayList;
import java.util.List;

public class ActivityWindow {

    private final List<Activity> activities;

    public ActivityWindow(List<Activity> activities) {
        this.activities = activities;
    }

    public static ActivityWindow empty() {
        return new ActivityWindow(new ArrayList<>());
    }

    public void addActivity(Activity activity) {
        this.activities.add(activity);
    }

    public Money getNewActivityBalance() {
        Money deposit = activities.stream()
                .filter(Activity::isNew)
                .filter(Activity::isDeposit)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);

        Money withdrawal = activities.stream()
                .filter(Activity::isNew)
                .filter(Activity::isWithdrawal)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);

        return Money.add(deposit, withdrawal.negate());
    }

    public Money getDepositBalance() {
        return activities.stream()
                .filter(Activity::isDeposit)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public Money getWithdrawalBalance() {
        return activities.stream()
                .filter(Activity::isWithdrawal)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }
}