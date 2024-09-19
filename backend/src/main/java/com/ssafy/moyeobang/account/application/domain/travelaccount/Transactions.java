package com.ssafy.moyeobang.account.application.domain.travelaccount;

import static com.ssafy.moyeobang.account.application.domain.travelaccount.TransactionType.DEPOSIT;
import static com.ssafy.moyeobang.account.application.domain.travelaccount.TransactionType.WITHDRAWAL;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.Money;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Transactions {

    private final List<Transaction> transactions;

    public Money getDepositBalance() {
        return transactions.stream()
                .filter(transaction -> DEPOSIT.equals(transaction.getType()))
                .map(Transaction::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public Money getWithdrawalBalance() {
        return transactions.stream()
                .filter(transaction -> WITHDRAWAL.equals(transaction.getType()))
                .map(Transaction::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public List<Transaction> getTransactionsRelatedTo(Set<Member> members) {
        return transactions.stream()
                .filter(transaction -> transaction.isRelatedTo(members))
                .toList();
    }
}
