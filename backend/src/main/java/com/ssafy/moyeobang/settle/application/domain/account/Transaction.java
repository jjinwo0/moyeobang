package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Transaction {

    private final Long id;

    private final String title;

    private final Money money;

    public static Transaction of(final Long id,
                                 final String title,
                                 final Money money) {

        return new Transaction(id, title, money);
    }

    public record Money (Integer amount, Action action) {}
}
