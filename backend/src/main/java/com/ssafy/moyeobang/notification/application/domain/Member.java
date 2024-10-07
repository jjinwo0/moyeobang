package com.ssafy.moyeobang.notification.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Member {

    private Long id;

    private String email;

    private String token;

    private String memberKey;

    public static Member of(final Long id, final String email, final String token, final String memberKey) {

        return new Member(id, email, token, memberKey);
    }
}
