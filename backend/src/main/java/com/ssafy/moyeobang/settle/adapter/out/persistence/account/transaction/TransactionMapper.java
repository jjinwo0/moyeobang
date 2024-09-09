package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Action;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction.Info;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction.Money;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    Transaction mapToWithdrawDomain(final WithdrawJpaEntity withdrawEntity) {

        return Transaction.of(
                withdrawEntity.getId(),
                new Info(
                        withdrawEntity.getTitle(),
                        withdrawEntity.getTravelAccount().getId(),
                        withdrawEntity.getTargetAccountNumber(),
                        withdrawEntity.getOrderJpaEntities().stream()
                                .map(OrderJpaEntity::getId)
                                .toList()
                ),
                new Money(
                        withdrawEntity.getAmount(),
                        Action.WITHDRAW
                )
        );
    }

    WithdrawJpaEntity mapToWithdrawEntity(final Transaction transaction, final TravelAccountJpaEntity entity) {

        return WithdrawJpaEntity.builder()
                .id(transaction.getId())
                .title(transaction.getInfo().title())
                .targetAccountNumber(transaction.getInfo().accountNumber())
                .amount(transaction.getMoney().amount())
                .travelAccount(entity)
                .build();
    }

    Transaction mapToDepositDomain(final DepositJpaEntity depositEntity) {

        return Transaction.of(
                depositEntity.getId(),
                new Info(
                        null,
                        depositEntity.getTravelAccount().getId(),
                        depositEntity.getTravelAccount().getAccountNumber(),
                        null
                ),
                new Money(
                        depositEntity.getAmount(),
                        Action.DEPOSIT
                )
        );
    }

    DepositJpaEntity mapToDepositEntity(final Transaction transaction, final TravelAccountJpaEntity entity) {

        return DepositJpaEntity.builder()
                .id(transaction.getId())
                .amount(transaction.getMoney().amount())
                .travelAccount(entity)
                .build();
    }
}
