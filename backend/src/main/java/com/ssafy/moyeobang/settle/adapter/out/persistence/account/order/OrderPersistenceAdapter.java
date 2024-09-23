package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction.TransactionPersistenceAdapter;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import com.ssafy.moyeobang.settle.application.port.out.CreateOrderPort;
import com.ssafy.moyeobang.settle.application.port.out.FindOrderPort;
import com.ssafy.moyeobang.settle.error.OrderNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class OrderPersistenceAdapter implements FindOrderPort, CreateOrderPort {

    private final OrderRepositoryInSettle orderRepository;

    private final TransactionPersistenceAdapter transactionPersistenceAdapter;

    private final OrderMapperInSettle orderMapperInSettle;

    @Override
    public Order findOrder(Long id) {

        OrderJpaEntity findEntity = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order id[" + id + "] 주문 건 정보가 존재하지 않습니다."));

        return orderMapperInSettle.mapToDomain(findEntity);
    }

    @Override
    public Order createOrder(OrderInfo info) {

        WithdrawJpaEntity findWithdraw = transactionPersistenceAdapter.findWithdrawEntity(info.transactionId());

        OrderJpaEntity createOrderEntity = orderMapperInSettle.createEntityByInfo(info, findWithdraw);

        orderRepository.save(createOrderEntity);

        return orderMapperInSettle.mapToDomain(createOrderEntity);
    }
}
