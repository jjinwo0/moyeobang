package com.ssafy.moyeobang.account.application.domain;

import static com.ssafy.moyeobang.account.application.domain.TransactionType.WITHDRAWAL;

import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class Withdrawal extends Transaction {

    private final String title;
    private final String address;
    private final String settleType;
    private final Settles settles;
    private final WithdrawTag tag;

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

    @Override
    public boolean isRelatedTo(Set<Member> members) {
        return members.stream().anyMatch(settles::isParticipate);
    }

    public Money getSettleAmountFor(Member member) {
        return getTotalSettleAmount().get(member);
    }

    public Map<Member, Money> getTotalSettleAmount() {
        return settles.getTotalSettleAmount();
    }

    public List<Settle> getSettles() {
        return settles.getSettles();
    }
}
