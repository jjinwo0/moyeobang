package com.ssafy.moyeobang.account.application.domain.travelaccount;

import static java.util.stream.Collectors.toSet;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
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

    public Set<Member> getParticipant() {
        return settle.stream()
                .map(Settle::getParticipants)
                .flatMap(Collection::stream)
                .collect(toSet());
    }
}
