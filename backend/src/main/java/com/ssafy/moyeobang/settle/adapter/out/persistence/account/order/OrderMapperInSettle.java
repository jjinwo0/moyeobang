package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class OrderMapperInSettle {

    Order mapToDomain(final OrderJpaEntity orderEntity) {

        return Order.of(
                orderEntity.getId(),
                new OrderInfo(
                        orderEntity.getTitle(),
                        (int) orderEntity.getAmount(),
                        orderEntity.getQuantity(),
                        orderEntity.getWithdraw().getId()
                ),
                orderEntity.getMemberOrderHistoryJpaEntities().stream()
                        .map(MemberOrderHistoryJpaEntity::getId)
                        .toList()
        );
    }

    OrderJpaEntity mapToEntity(final Order order, final WithdrawJpaEntity withdrawEntity) {

        return OrderJpaEntity.builder()
                .title(order.getOrderInfo().title())
                .amount(order.getOrderInfo().amount())
                .quantity(order.getOrderInfo().quantity())
                .withdraw(withdrawEntity)
                .build();
    }

    OrderJpaEntity createEntityByInfo(final OrderInfo orderInfo, final WithdrawJpaEntity withdrawEntity) {

        return OrderJpaEntity.builder()
                .title(orderInfo.title())
                .amount(orderInfo.amount())
                .quantity(orderInfo.quantity())
                .withdraw(withdrawEntity)
                .build();
    }

    List<Order> mapToDomainList(final List<OrderJpaEntity> orderJpaEntityList) {

        return orderJpaEntityList.stream()
                .map(this::mapToDomain)
                .toList();
    }
}
