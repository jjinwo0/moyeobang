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

    public static Member of(final Long id, final String email, final String token) {

        return new Member(id, email, token);
    }
}
