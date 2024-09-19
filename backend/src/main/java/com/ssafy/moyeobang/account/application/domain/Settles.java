package com.ssafy.moyeobang.account.application.domain;

import static java.util.stream.Collectors.toSet;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settles {

    private final List<Settle> settle;

    public Money getAmountFor(Member member) {
        return settle.stream()
                .map(history -> history.getAmountFor(member))
                .reduce(Money.ZERO, Money::add);
    }

    public Set<Long> getParticipantIds() {
        return settle.stream()
                .map(Settle::getParticipantIds)
                .flatMap(Collection::stream)
                .collect(toSet());
    }
}
