package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Transaction {

    private final Long id;

    private final String title;

    private final Action action;

    public static Transaction of(final Long id,
                                 final String title,
                                 final Action action) {

        return new Transaction(id, title, action);
    }
}
