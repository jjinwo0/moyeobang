package com.ssafy.moyeobang.account.application.domain;

import lombok.Getter;

@Getter
public class Member {

    public Member(String memberKey) {
        this.memberKey = memberKey;
    }

    private String memberKey;
}
