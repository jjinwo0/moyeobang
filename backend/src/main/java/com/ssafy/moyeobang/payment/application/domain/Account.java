package com.ssafy.moyeobang.payment.application.domain;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = PRIVATE)
public class Account {

    @Getter
    private final String accountNumber;

    public static Account of(String accountNumber) {
        return new Account(accountNumber);
    }

    public void payment(Account targetAccount, int amount) {

    }
}
