package com.ssafy.moyeobang.notification.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TravelAccount {

    private Long id;

    private String accountNo;

    public static TravelAccount of(Long id, String accountNo) {
        return new TravelAccount(id, accountNo);
    }
}
