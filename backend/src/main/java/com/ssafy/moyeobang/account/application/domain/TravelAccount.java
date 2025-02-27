package com.ssafy.moyeobang.account.application.domain;

import static java.time.LocalDateTime.now;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TravelAccount {

    private final String accountNumber;
    private final Members members;
    private final Transactions transactions;

    public void deposit(Member member, Money money) {
        Deposit deposit = Deposit.builder()
                .transactionAccountNumber(member.getAccountNumber())
                .timestamp(now())
                .money(money)
                .balanceSnapshot(Money.add(getBalance(), money))
                .depositMember(member)
                .build();

        transactions.add(deposit);
    }

    public Money getBalance() {
        return Money.subtract(
                transactions.getDepositBalance(),
                transactions.getWithdrawalBalance()
        );
    }

    public Money getDepositAmount() {
        return transactions.getDepositBalance();
    }

    public Money getWithdrawAmount() {
        return transactions.getWithdrawalBalance();
    }

    public List<Transaction> getTransactionsRelatedTo(Set<Long> memberIds) {
        return transactions.getTransactionsRelatedTo(
                members.getMembers(memberIds)
        );
    }

    public Optional<Withdrawal> findTransactionBy(Long transactionId) {
        return transactions.findTransactionBy(transactionId);
    }

    public Money getBalanceFor(Member member) {
        return Money.subtract(
                getDepositAmountFor(member),
                getWithdrawAmountFor(member)
        );
    }

    public Money getDepositAmountFor(Member member) {
        return transactions.getDepositBalanceFor(member);
    }

    public Money getWithdrawAmountFor(Member member) {
        return transactions.getWithdrawalBalanceFor(member);
    }

    public WithdrawTagStatistics getWithdrawTagStatistics(Set<Long> memberIds) {
        Map<WithdrawTag, Money> statistics = transactions.getWithdrawTagStatistics(
                members.getMembers(memberIds)
        );

        return new WithdrawTagStatistics(statistics);
    }

    public Map<Member, Money> getMemberWithdrawStatistics() {
        return members.getMembers().values().stream()
                .collect(Collectors.toMap(
                        member -> member,
                        this::getWithdrawAmountFor
                ));
    }
}
