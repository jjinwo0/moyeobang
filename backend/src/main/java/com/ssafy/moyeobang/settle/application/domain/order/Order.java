package com.ssafy.moyeobang.settle.application.domain.order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Order {

    private final Long id;

    private final OrderInfo orderInfo;

    private final List<Long> memberOrderHistories;

    public static Order of(Long id, OrderInfo info, List<Long> memberOrderHistories) {

        return new Order(id, info, memberOrderHistories);
    }

    public record OrderInfo(String title, long amount, Long transactionId) {}
}
