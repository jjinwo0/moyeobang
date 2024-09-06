package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.order.Order;

public interface FindOrderPort {

    Order findOrder(Long id);
}
