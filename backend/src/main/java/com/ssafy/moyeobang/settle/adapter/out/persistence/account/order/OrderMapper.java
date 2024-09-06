package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction.WithdrawEntity;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    Order mapToDomain(final OrderEntity orderEntity) {

        return Order.of(
                orderEntity.getId(),
                new OrderInfo(
                        orderEntity.getTitle(),
                        orderEntity.getAmount(),
                        orderEntity.getWithdrawEntity().getId()
                ),
                orderEntity.getMemberOrderHistories().stream()
                        .map(MemberOrderHistoryEntity::getId)
                        .toList()
        );
    }

    OrderEntity mapToEntity(final Order order, final WithdrawEntity entity) {

        return OrderEntity.builder()
                .id(order.getId())
                .title(order.getOrderInfo().title())
                .amount(order.getOrderInfo().amount())
                .withdrawEntity(entity)
                .build();
    }

    OrderEntity createEntityByInfo(final OrderInfo orderInfo, final WithdrawEntity entity) {

        return OrderEntity.builder()
                .title(orderInfo.title())
                .amount(orderInfo.amount())
                .withdrawEntity(entity)
                .build();
    }
}
