package com.ssafy.moyeobang.account.application.domain.travelaccount;

import com.ssafy.moyeobang.account.application.domain.Money;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TravelAccount {

    private final String accountNumber;
    private final Members members;
    private final Transactions transactions;

    public Money getBalance() {
        return Money.subtract(
                transactions.getDepositBalance(),
                transactions.getWithdrawalBalance()
        );
    }

    public List<Transaction> getTransactionsRelatedTo(Set<Long> memberIds) {
        return transactions.getTransactionsRelatedTo(
                members.getMembers(memberIds)
        );
    }

    public Optional<Withdrawal> findTransactionBy(Long transactionId) {
        return transactions.getTransactions().stream()
                .filter(transaction -> transaction.getType().equals(TransactionType.WITHDRAWAL))
                .filter(transaction -> transaction.getTransactionId().equals(transactionId))
                .findFirst()
                .map(Withdrawal.class::cast);
    }
}
