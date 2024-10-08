package com.ssafy.moyeobang.payment.application.domain;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = PRIVATE)
public class Withdraw {
    
    private final String toAccount;
    private final int amount;

    public static Withdraw create(String toAccount, int amount) {
        return new Withdraw(toAccount, amount);
    }
}

