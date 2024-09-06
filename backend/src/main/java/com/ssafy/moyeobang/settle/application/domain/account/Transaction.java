package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Transaction {

    private final Long id;

    private final Info info;

    private final Money money;

    private Transaction(Long id, Money money) {

        this.id = id;
        this.info = null;
        this.money = money;
    }

    public static Transaction of(final Long id,
                                 final Info info,
                                 final Money money) {

        return new Transaction(id, info, money);
    }

    public static Transaction ofDeposit(final Long id, final Money money) {

        return new Transaction(id, money);
    }

    public record Info (String title, String accountNumber) {}

    public record Money (Integer amount, Action action) {}
}
