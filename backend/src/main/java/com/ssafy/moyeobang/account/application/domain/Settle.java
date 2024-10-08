package com.ssafy.moyeobang.account.application.domain;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Settle {

    private final Long id;
    private final String title;
    private final Map<Member, Money> settle;

    public Money getAmountFor(Member member) {
        return settle.getOrDefault(member, Money.ZERO);
    }

    public Set<Member> getParticipants() {
        return settle.keySet();
    }

    public Map<Member, Money> getSettle() {
        return Collections.unmodifiableMap(settle);
    }

    public Money getAmount() {
        return settle.values().stream()
                .reduce(Money.ZERO, Money::add);
    }
}
