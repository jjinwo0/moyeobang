package com.ssafy.moyeobang.account.adapter.in.web.response;

import com.ssafy.moyeobang.account.application.domain.Transaction;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public record GetTransactionHistoriesResponse(Long transactionId,
                                              String paymentName,
                                              Long money,
                                              Set<ParticipantInfo> participants,
                                              String transactionType,
                                              Long currentBalance,
                                              LocalDateTime createdAt) {

    public GetTransactionHistoriesResponse(Transaction transaction) {
        this(
                transaction.getTransactionId(),
                transaction.getTransactionTitle(),
                transaction.getMoney().getAmount(),
                transaction.getParticipants().stream()
                        .map(member -> new ParticipantInfo(member.getId(), member.getName(), member.getProfileImage()))
                        .collect(Collectors.toSet()),
                transaction.getType().getDescription(),
                transaction.getBalanceSnapshot().getAmount(),
                transaction.getTimestamp()
        );
    }

    public record ParticipantInfo(Long memberId, String memberName, String profileImage) {
    }
}
