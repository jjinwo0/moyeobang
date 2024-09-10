package com.ssafy.moyeobang.account.application.domain;

import java.util.ArrayList;
import java.util.Collections;
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

    public Money calculateBalance() {
        Money depositBalance = getDepositBalance();
        Money withdrawalBalance = getWithdrawalBalance();

        return Money.add(depositBalance, withdrawalBalance.negate());
    }

    public List<Activity> getActivities() {
        return Collections.unmodifiableList(activities);
    }

    private Money getDepositBalance() {
        return activities.stream()
                .filter(Activity::isDeposit)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    private Money getWithdrawalBalance() {
        return activities.stream()
                .filter(Activity::isWithdrawal)
                .map(Activity::getMoney)
                .reduce(Money.ZERO, Money::add);
    }
}