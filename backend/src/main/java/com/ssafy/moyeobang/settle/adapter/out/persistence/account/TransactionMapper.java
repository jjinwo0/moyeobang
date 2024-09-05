package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction.Money;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    Transaction mapToDomain(final TransactionEntity transactionEntity) {

        return Transaction.of(
                transactionEntity.getId(),
                transactionEntity.getTitle(),
                new Money(
                        transactionEntity.getAmount(),
                        transactionEntity.getAction()
                )
        );
    }

    TransactionEntity mapToEntity(final Transaction transaction) {

        return TransactionEntity.builder()
                .id(transaction.getId())
                .title(transaction.getTitle())
                .amount(transaction.getMoney().amount())
                .action(transaction.getMoney().action())
                .build();
    }
}
