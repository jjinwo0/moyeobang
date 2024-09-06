package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.adapter.out.persistence.account.order.OrderEntity;
import com.ssafy.moyeobang.settle.application.domain.order.Order;
import com.ssafy.moyeobang.settle.application.domain.order.Order.OrderInfo;

public interface CreateOrderPort {

    Order createOrder(OrderInfo orderInfo);
}
