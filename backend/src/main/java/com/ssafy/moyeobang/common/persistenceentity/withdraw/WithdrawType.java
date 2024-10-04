package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WithdrawType {

    ACTIVITY("액티비티"),
    CAFE("카페"),
    RESTAURANT("식당"),
    AIRPLANE("항공"),
    ACCOMMODATION("숙박"),
    SHOPPING("쇼핑"),
    ETC("기타");

    private final String description;
}
