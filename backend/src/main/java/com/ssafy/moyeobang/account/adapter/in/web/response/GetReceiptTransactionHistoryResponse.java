package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.travelaccount.Withdrawal;
import java.util.List;

public class GetReceiptTransactionHistoryResponse extends GetTransactionHistoryResponse {

    private final List<SettledItemInfo> details;

    public GetReceiptTransactionHistoryResponse(Withdrawal withdrawal) {
        super(
                withdrawal.getTransactionId(),
                withdrawal.getTransactionTitle(),
                withdrawal.getAddress(),
                "12324324BDF3",
                withdrawal.getMoney().getAmount(),
                withdrawal.getTimestamp()
        );

        this.details = withdrawal.getSettles().stream()
                .map(settle -> new SettledItemInfo(
                                settle.getId(),
                                settle.getTitle(),
                                settle.getAmount().getAmount(),
                                1L,
                                settle.getParticipants().stream()
                                        .map(member -> new ParticipantInfo(member.getId(), member.getName(), member.getProfileImage()))
                                        .toList()
                        )
                )
                .toList();
    }

    @Override
    public Object getDetails() {
        return details;
    }

    @Override
    public String getSplitMethod() {
        return "receipt";
    }

    public record SettledItemInfo(Long orderItemId,
                                  String orderItemTitle,
                                  Long orderItemPrice,
                                  Long orderItemQuantity,
                                  List<ParticipantInfo> participants) {
    }
}
