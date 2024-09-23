package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum SettleType {

    RECEIPT("영수증"),
    CUSTOM("커스텀");

    private final String description;
}
