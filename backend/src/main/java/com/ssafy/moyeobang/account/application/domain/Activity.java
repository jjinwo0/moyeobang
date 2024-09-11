package com.ssafy.moyeobang.account.application.domain;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class Activity {

    private Long id;
    private final String ownerAccountNumber;
    private final String sourceAccountNumber;
    private final String targetAccountNumber;
    private final LocalDateTime timestamp;
    private final Money money;

    public boolean isNew() {
        return id == null;
    }

    public boolean isDeposit() {
        return ownerAccountNumber.equals(targetAccountNumber);
    }

    public boolean isWithdrawal() {
        return ownerAccountNumber.equals(sourceAccountNumber);
    }
}