package com.ssafy.moyeobang.account.application.domain;

import static java.util.stream.Collectors.toMap;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class Settle {

    private final Map<Long, Money> settle;

    public Settle(Map<Long, Long> settle) {
        this.settle = settle.entrySet().stream()
                .collect(toMap(
                        Entry::getKey,
                        entry -> Money.of(entry.getValue())
                ));
    }

    public Money getAmountFor(Member member) {
        return settle.getOrDefault(member.getId(), Money.ZERO);
    }

    public Set<Long> getParticipantIds() {
        return settle.keySet();
    }
}
