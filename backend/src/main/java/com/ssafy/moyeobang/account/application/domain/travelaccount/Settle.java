package com.ssafy.moyeobang.account.application.domain.travelaccount;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settle {

    private final Map<Member, Money> settle;

    public Money getAmountFor(Member member) {
        return settle.getOrDefault(member, Money.ZERO);
    }

    public Set<Member> getParticipants() {
        return settle.keySet();
    }
}
