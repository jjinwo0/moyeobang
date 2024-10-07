package com.ssafy.moyeobang.payment.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderItem {

    private final String title;
    private final Money amount;

}
