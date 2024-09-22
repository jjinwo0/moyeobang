package com.ssafy.moyeobang.account.application.domain.travelaccount;

import static java.util.stream.Collectors.toMap;
import static java.util.stream.Collectors.toSet;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settles {

    private final List<Settle> settles;

    public Set<Member> getParticipant() {
        return settles.stream()
                .map(Settle::getParticipants)
                .flatMap(Collection::stream)
                .collect(toSet());
    }

    public Map<Member, Money> getTotalSettleAmount() {
        return settles.stream()
                .map(Settle::getSettle)
                .map(Map::entrySet)
                .flatMap(Set::stream)
                .collect(toMap(
                        Entry::getKey,
                        Entry::getValue,
                        Money::add
                ));
    }

    public List<Settle> getSettles() {
        return Collections.unmodifiableList(settles);
    }
}
