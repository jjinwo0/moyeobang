package com.ssafy.moyeobang.payment.application.domain;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = PRIVATE)
public class TravelAccount {

    private final String accountNumber;
    private final Money balance;

    public static TravelAccount of(String accountNumber, Money balance) {
        return new TravelAccount(accountNumber, balance);
    }

    public boolean couldNotWithdraw(Money money) {
        return !Money.subtract(balance, money)
                .isPositiveOrZero();
    }
}
