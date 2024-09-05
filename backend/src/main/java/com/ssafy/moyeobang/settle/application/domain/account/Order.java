package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Order {

    private final Long id;

    private final String title;

    private final Integer amount;

    private final Transaction transaction;

    public static Order of(Long id, String title, Integer amount, Transaction transaction) {

        return new Order(id, title, amount, transaction);
    }
}
