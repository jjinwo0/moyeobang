package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction.TransactionPersistenceAdapter;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction.WithdrawEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;
import com.ssafy.moyeobang.settle.application.error.OrderNotFoundException;
import com.ssafy.moyeobang.settle.application.port.out.CreateOrderPort;
import com.ssafy.moyeobang.settle.application.port.out.FindOrderPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class OrderPersistenceAdapter implements FindOrderPort, CreateOrderPort {

    private final OrderRepository orderRepository;

    private final TransactionPersistenceAdapter transactionPersistenceAdapter;

    private final OrderMapper orderMapper;

    @Override
    public Order findOrder(Long id) {

        OrderEntity findEntity = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order id[" + id + "] 주문 건 정보가 존재하지 않습니다."));

        return orderMapper.mapToDomain(findEntity);
    }

    @Override
    public Order createOrder(OrderInfo info) {

        WithdrawEntity findWithdraw = transactionPersistenceAdapter.findWithdrawEntity(info.transactionId());

        OrderEntity createOrderEntity = orderMapper.createEntityByInfo(info, findWithdraw);

        orderRepository.save(createOrderEntity);

        return orderMapper.mapToDomain(createOrderEntity);
    }
}
