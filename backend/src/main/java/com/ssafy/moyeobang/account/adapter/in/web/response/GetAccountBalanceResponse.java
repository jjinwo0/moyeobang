package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Money;

public record GetAccountBalanceResponse(Long currentBalance,
                                        Long totalAmount,
                                        Long totalSpent,
                                        Double usagePercentage) {

    public GetAccountBalanceResponse(Money currentBalance,
                                     Money totalAmount,
                                     Money totalSpent) {
        this(
                currentBalance.getAmount(),
                totalAmount.getAmount(),
                totalSpent.getAmount(),
                (double) totalSpent.getAmount() / totalAmount.getAmount()
        );
    }
}
