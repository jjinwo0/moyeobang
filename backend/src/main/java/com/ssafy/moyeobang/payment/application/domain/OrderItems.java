package com.ssafy.moyeobang.payment.application.domain;

import java.util.List;
import lombok.Getter;

public class OrderItems {

    @Getter
    private final List<OrderItem> orderItems;

    public OrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

}
