package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {

    MEMBER("일반 회원"),
    ADMIN("관리자");

    private final String description;
}
