package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.WithdrawTag;
import com.ssafy.moyeobang.account.application.domain.WithdrawTagStatistics;
import java.util.List;
import java.util.Map.Entry;

public record GetWithdrawTagResponse(String categoryName,
                                     String proportion,
                                     Long balance) {

    public static List<GetWithdrawTagResponse> createResponses(WithdrawTagStatistics statistics) {
        Long totalAmount = statistics.getTotalAmount();

        return statistics.getStatistics().entrySet().stream()
                .map(entry -> createResponse(entry, totalAmount))
                .toList();
    }

    private static GetWithdrawTagResponse createResponse(Entry<WithdrawTag, Money> entry, Long totalAmount) {
        return new GetWithdrawTagResponse(
                entry.getKey().getDescription(),
                "%.1f".formatted((double) entry.getValue().getAmount() * 100 / totalAmount),
                entry.getValue().getAmount()
        );
    }
}
