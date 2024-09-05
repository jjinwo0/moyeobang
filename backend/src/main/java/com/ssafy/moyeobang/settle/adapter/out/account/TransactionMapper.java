package com.ssafy.moyeobang.settle.adapter.out.account;

import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    Transaction mapToDomain(final Transaction transaction) {

        return Transaction.of(
                transaction.getId(),
                transaction.getTitle(),
                transaction.getAction()
        );
    }

    TransactionEntity mapToEntity(final Transaction transaction) {

        return TransactionEntity.builder()
                .id(transaction.getId())
                .title(transaction.getTitle())
                .action(transaction.getAction())
                .build();
    }
}
