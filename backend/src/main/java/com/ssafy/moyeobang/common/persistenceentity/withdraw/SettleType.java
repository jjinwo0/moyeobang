package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SettleType {

    RECEIPT("영수증"),
    CUSTOM("커스텀");

    private final String description;

    public static boolean isSettleType(String type) {
        try {
            SettleType.valueOf(type);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
