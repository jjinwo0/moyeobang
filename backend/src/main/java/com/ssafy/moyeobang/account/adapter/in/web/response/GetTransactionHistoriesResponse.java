package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.travelaccount.Transaction;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class GetTransactionHistoriesResponse {

    private final Long transactionId;
    private final String paymentName;
    private final Long money;
    private final Set<ParticipantInfo> participants;
    private final String transactionType;
    private final Long currentBalance;
    private final LocalDateTime createdAt;

    public GetTransactionHistoriesResponse(Transaction transaction) {
        this.transactionId = transaction.getTransactionId();
        this.paymentName = transaction.getTransactionTitle();
        this.money = transaction.getMoney().getAmount();
        this.transactionType = transaction.getType().getDescription();
        this.currentBalance = transaction.getBalanceSnapshot().getAmount();
        this.createdAt = transaction.getTimestamp();

        this.participants = transaction.getParticipants().stream()
                .map(member -> new ParticipantInfo(member.getId(), member.getName(), member.getProfileImage()))
                .collect(Collectors.toSet());
    }

    public record ParticipantInfo(Long memberId, String memberName, String profileImage) {
    }
}
