package com.ssafy.moyeobang.account.application.domain;

import static com.ssafy.moyeobang.account.application.domain.TransactionType.DEPOSIT;
import static com.ssafy.moyeobang.account.application.domain.TransactionType.WITHDRAWAL;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.reducing;
import static java.util.stream.Collectors.toMap;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Transactions {

    private final List<Transaction> transactions;

    public void add(Transaction transaction) {
        transactions.add(transaction);
    }

    public Optional<Withdrawal> findTransactionBy(Long transactionId) {
        return transactions.stream()
                .filter(transaction -> transaction.getType().equals(TransactionType.WITHDRAWAL))
                .filter(transaction -> transaction.getTransactionId().equals(transactionId))
                .findFirst()
                .map(Withdrawal.class::cast);
    }

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

    public Money getDepositBalanceFor(Member member) {
        return getTransactionsRelatedTo(Set.of(member)).stream()
                .filter(transaction -> DEPOSIT.equals(transaction.getType()))
                .map(Transaction::getMoney)
                .reduce(Money.ZERO, Money::add);
    }

    public Money getWithdrawalBalanceFor(Member member) {
        return getTransactionsRelatedTo(Set.of(member)).stream()
                .filter(transaction -> WITHDRAWAL.equals(transaction.getType()))
                .map(Withdrawal.class::cast)
                .map(withdrawal -> withdrawal.getSettleAmountFor(member))
                .reduce(Money.ZERO, Money::add);
    }

    public List<Transaction> getTransactionsRelatedTo(Set<Member> members) {
        return transactions.stream()
                .filter(transaction -> transaction.isRelatedTo(members))
                .toList();
    }

    public List<Transaction> getTransactions() {
        return Collections.unmodifiableList(transactions);
    }

    public Map<WithdrawTag, Money> getWithdrawTagStatistics(Set<Member> members) {
        return members.stream()
                .map(this::getWithdrawTagStatistics)
                .map(Map::entrySet)
                .flatMap(Set::stream)
                .collect(groupingBy(
                        Entry::getKey,
                        reducing(Money.ZERO, Entry::getValue, Money::add)
                ));
    }

    private Map<WithdrawTag, Money> getWithdrawTagStatistics(Member member) {
        return getTransactionsRelatedTo(Set.of(member)).stream()
                .filter(transaction -> WITHDRAWAL.equals(transaction.getType()))
                .map(Withdrawal.class::cast)
                .collect(groupingBy(
                        Withdrawal::getTag,
                        reducing(Money.ZERO, withdraw -> withdraw.getSettleAmountFor(member), Money::add))
                );
    }
}
