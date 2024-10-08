package com.ssafy.moyeobang.account.application.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransactionType {

    DEPOSIT("입금"),
    WITHDRAWAL("출금");

    private final String description;
}
