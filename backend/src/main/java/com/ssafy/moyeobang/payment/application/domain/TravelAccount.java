package com.ssafy.moyeobang.payment.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TravelAccount {

    private final String accountNumber;
    private final Money balance;
    private final Long travelId;

    public static TravelAccount of(String accountNumber, Money balance, Long travelId) {
        return new TravelAccount(accountNumber, balance, travelId);
    }

    public boolean couldNotWithdraw(Money money) {
        return !Money.subtract(balance, money)
                .isPositiveOrZero();
    }
}
