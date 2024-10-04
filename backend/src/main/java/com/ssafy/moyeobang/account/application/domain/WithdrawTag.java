package com.ssafy.moyeobang.account.application.domain;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WithdrawTag {

    ACTIVITY("액티비티"),
    CAFE("카페"),
    RESTAURANT("식당"),
    AIRPLANE("항공"),
    ACCOMMODATION("숙박"),
    SHOPPING("쇼핑"),
    ETC("기타");

    private final String description;

    public static WithdrawTag findBy(String description) {
        return Arrays.stream(values())
                .filter(withdrawTag -> withdrawTag.description.equals(description))
                .findAny()
                .orElse(ETC);
    }
}
