package com.ssafy.moyeobang.settle.application.domain.account;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigInteger;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Transaction {

    private final Long id;

    private final Info info;

    private final Money money;

    public static Transaction of(final Long id,
                                 final Info info,
                                 final Money money) {

        return new Transaction(id, info, money);
    }

    public record Info (String title, Long accountId, String accountNumber, List<Long> orderList) {}

    public record Money (long amount, Action action) {}
}
