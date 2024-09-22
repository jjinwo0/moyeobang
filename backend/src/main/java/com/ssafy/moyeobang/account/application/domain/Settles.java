package com.ssafy.moyeobang.account.application.domain;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settles {

    private final List<Settle> settle;

    public Money getAmountFor(Member member) {
        return settle.stream()
                .map(history -> history.getAmountFor(member))
                .reduce(Money.ZERO, Money::add);
    }
}
