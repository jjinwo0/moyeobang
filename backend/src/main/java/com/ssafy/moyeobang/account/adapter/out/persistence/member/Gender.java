package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Gender {

    MALE("남성"),
    FEMALE("여성");

    private final String description;
}
