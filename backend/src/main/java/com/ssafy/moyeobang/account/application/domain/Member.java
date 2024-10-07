package com.ssafy.moyeobang.account.application.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@EqualsAndHashCode
@RequiredArgsConstructor
public class Member {

    private final Long id;
    private final String name;
    private final String profileImage;
    private final String memberKey;
    private final String accountNumber;
}

