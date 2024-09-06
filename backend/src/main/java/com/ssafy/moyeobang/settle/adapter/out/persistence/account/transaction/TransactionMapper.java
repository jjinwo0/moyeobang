package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.settle.adapter.out.persistence.account.TravelAccountEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.order.OrderEntity;
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
                        withdrawEntity.getTravelAccountEntity().getId(),
                        withdrawEntity.getTargetAccountNumber(),
                        withdrawEntity.getOrderEntities().stream()
                                .map(OrderEntity::getId)
                                .toList()
                ),
                new Money(
                        withdrawEntity.getAmount(),
                        Action.WITHDRAW
                )
        );
    }

    WithdrawEntity mapToWithdrawEntity(final Transaction transaction, final TravelAccountEntity entity) {

        return WithdrawEntity.builder()
                .id(transaction.getId())
                .title(transaction.getInfo().title())
                .targetAccountNumber(transaction.getInfo().accountNumber())
                .amount(transaction.getMoney().amount())
                .travelAccountEntity(entity)
                .build();
    }

    Transaction mapToDepositDomain(final DepositEntity depositEntity) {

        return Transaction.of(
                depositEntity.getId(),
                new Info(
                        null,
                        depositEntity.getTravelAccountEntity().getId(),
                        null,
                        null
                ),
                new Money(
                        depositEntity.getAmount(),
                        Action.DEPOSIT
                )
        );
    }

    DepositEntity mapToDepositEntity(final Transaction transaction, final TravelAccountEntity entity) {

        return DepositEntity.builder()
                .id(transaction.getId())
                .amount(transaction.getMoney().amount())
                .travelAccountEntity(entity)
                .build();
    }
}
