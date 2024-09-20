package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Withdrawal;
import java.util.List;

public class GetCustomTransactionHistoryResponse extends GetTransactionHistoryResponse {

    private List<SettledParticipantInfo> details;

    public GetCustomTransactionHistoryResponse(Withdrawal withdrawal) {
        super(
                withdrawal.getTransactionId(),
                withdrawal.getTransactionTitle(),
                withdrawal.getAddress(),
                "12324324BDF3",
                withdrawal.getMoney().getAmount(),
                withdrawal.getTimestamp()
        );

        this.details = withdrawal.getTotalSettleAmount().entrySet().stream()
                .map(settle -> new SettledParticipantInfo(
                        new ParticipantInfo(settle.getKey().getId(), settle.getKey().getName(), settle.getKey().getProfileImage()),
                        settle.getValue().getAmount()
                ))
                .toList();
    }

    @Override
    public Object getDetails() {
        return details;
    }

    @Override
    public String getSplitMethod() {
        return "custom";
    }

    public record SettledParticipantInfo(ParticipantInfo participant, Long money) {
    }
}
