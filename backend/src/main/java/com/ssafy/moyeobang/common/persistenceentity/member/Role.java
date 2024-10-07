package com.ssafy.moyeobang.common.persistenceentity.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    MEMBER("일반 회원", "MEMBER"),
    ADMIN("관리자", "ADMIN");

    private final String description;

    private final String roleType;
}
