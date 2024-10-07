package com.ssafy.moyeobang.account.application.domain;

import java.util.Collections;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class WithdrawTagStatistics {

    private final Map<WithdrawTag, Money> statistics;

    public Long getTotalAmount() {
        return statistics.values().stream()
                .mapToLong(Money::getAmount)
                .sum();
    }

    public Map<WithdrawTag, Money> getStatistics() {
        return Collections.unmodifiableMap(statistics);
    }
}
