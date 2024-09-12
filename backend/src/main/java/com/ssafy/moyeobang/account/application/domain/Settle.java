package com.ssafy.moyeobang.account.application.domain;

import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Settle {

    private final Map<Member, Money> moneys;

    public Money getAmountFor(Member member) {
        return moneys.get(member);
    }
}
