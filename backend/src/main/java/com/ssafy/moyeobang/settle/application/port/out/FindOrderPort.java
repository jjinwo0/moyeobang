package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.order.Order;
import java.util.List;

public interface FindOrderPort {

    Order findOrder(Long id);

    List<Order> findOrderListByTransactionId(Long transactionId);
}
