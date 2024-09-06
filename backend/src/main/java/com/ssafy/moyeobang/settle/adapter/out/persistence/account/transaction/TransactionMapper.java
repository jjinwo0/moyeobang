package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.settle.application.domain.account.Action;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction.Info;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction.Money;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    Transaction mapToWithdrawDomain(final WithdrawEntity withdrawEntity) {

        return Transaction.of(
                withdrawEntity.getId(),
                new Info(
                        withdrawEntity.getTitle(),
                        withdrawEntity.getTargetAccountNumber()
                ),
                new Money(
                        withdrawEntity.getAmount(),
                        Action.WITHDRAW
                )
        );
    }

    WithdrawEntity mapToWithdrawEntity(final Transaction transaction) {

        return WithdrawEntity.builder()
                .id(transaction.getId())
                .title(transaction.getInfo().title())
                .targetAccountNumber(transaction.getInfo().accountNumber())
                .amount(transaction.getMoney().amount())
                .build();
    }

    Transaction mapToDepositDomain(final DepositEntity depositEntity) {

        return Transaction.ofDeposit(
                depositEntity.getId(),
                new Money(
                        depositEntity.getAmount(),
                        Action.DEPOSIT
                )
        );
    }

    DepositEntity mapToDepositEntity(final Transaction transaction) {

        return DepositEntity.builder()
                .id(transaction.getId())
                .amount(transaction.getMoney().amount())
                .build();
    }
}
