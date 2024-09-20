package com.ssafy.moyeobang.account.application.domain;

import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class Transaction {

    private Long transactionId;
    private final String transactionAccountNumber;
    private final LocalDateTime timestamp;
    private final Money money;
    private final Money balanceSnapshot;

    public abstract TransactionType getType();

    public abstract String getTransactionTitle();

    public abstract Set<Member> getParticipants();

    public abstract boolean isRelatedTo(Set<Member> members);
}
