package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Money;

public record GetAccountMemberBalanceResponse(ParticipantInfo simpleUserProfile,
                                              Long personalCurrentBalance,
                                              Long personalTotalAmount,
                                              Long personalTotalSpent,
                                              Double personalUsagePercentage,
                                              Boolean needsAdditionalDeposit) {

    public GetAccountMemberBalanceResponse(Long memberId,
                                           String memberName,
                                           String profileImage,
                                           Money currentBalance,
                                           Money totalAmount,
                                           Money totalSpent) {
        this(
                new ParticipantInfo(memberId, memberName, profileImage),
                currentBalance.getAmount(),
                totalAmount.getAmount(),
                totalSpent.getAmount(),
                (double) totalSpent.getAmount() / totalAmount.getAmount() * 100,
                (double) totalSpent.getAmount() / totalAmount.getAmount() >= 0.8
        );
    }
}
