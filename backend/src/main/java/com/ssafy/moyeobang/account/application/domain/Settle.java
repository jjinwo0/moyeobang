package com.ssafy.moyeobang.account.application.domain;

import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settle {

    private final Map<Long, Money> moneys;

    public Money getAmountFor(Member member) {
        return moneys.getOrDefault(member.getId(), Money.ZERO);
    }
}
