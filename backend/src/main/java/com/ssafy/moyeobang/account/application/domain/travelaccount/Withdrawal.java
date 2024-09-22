package com.ssafy.moyeobang.account.application.domain.travelaccount;

import static com.ssafy.moyeobang.account.application.domain.travelaccount.TransactionType.WITHDRAWAL;

import com.ssafy.moyeobang.account.application.domain.Member;
import java.util.Set;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class Withdrawal extends Transaction {

    private final String title;
    private final Settles settles;

    @Override
    public TransactionType getType() {
        return WITHDRAWAL;
    }

    @Override
    public String getTransactionTitle() {
        return title;
    }

    @Override
    public Set<Member> getParticipants() {
        return settles.getParticipant();
    }
}
