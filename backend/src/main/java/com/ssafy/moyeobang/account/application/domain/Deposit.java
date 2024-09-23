package com.ssafy.moyeobang.account.application.domain;

import static com.ssafy.moyeobang.account.application.domain.TransactionType.DEPOSIT;

import java.util.Set;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class Deposit extends Transaction {

    private final Member depositMember;

    @Override
    public TransactionType getType() {
        return DEPOSIT;
    }

    @Override
    public String getTransactionTitle() {
        return depositMember.getName();
    }

    @Override
    public Set<Member> getParticipants() {
        return Set.of(depositMember);
    }

    @Override
    public boolean isRelatedTo(Set<Member> members) {
        return members.contains(depositMember);
    }
}
