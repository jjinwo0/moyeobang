package com.ssafy.moyeobang.account.adapter.in.web.response;

public record GetAccountBalanceResponse(String accountNumber,
                                        Long totalBalance,
                                        Long totalSpent,
                                        Double usagePercentage) {
}
