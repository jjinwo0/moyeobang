package com.ssafy.moyeobang.common.persistenceentity.member;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum LoginType {

    GOOGLE("구글"),
    KAKAO("카카오");

    private final String description;
}
