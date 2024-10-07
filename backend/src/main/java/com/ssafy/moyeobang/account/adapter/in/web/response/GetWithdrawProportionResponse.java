package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public record GetWithdrawProportionResponse(ParticipantInfo participantInfo,
                                            String proportion,
                                            Long balance) {

    public static List<GetWithdrawProportionResponse> createResponses(Map<Member, Money> statistics) {
        long totalAmount = statistics.values().stream()
                .mapToLong(Money::getAmount)
                .sum();

        return statistics.entrySet().stream()
                .map(entry -> createResponse(entry, totalAmount))
                .toList();
    }

    private static GetWithdrawProportionResponse createResponse(Entry<Member, Money> entry, Long totalAmount) {
        Member member = entry.getKey();
        Money money = entry.getValue();

        return new GetWithdrawProportionResponse(
                new ParticipantInfo(member.getId(), member.getName(), member.getProfileImage()),
                "%.1f".formatted((double) money.getAmount() * 100 / totalAmount),
                money.getAmount()
        );
    }
}
