package com.ssafy.moyeobang.member.application.domain;

import lombok.Getter;

@Getter
public enum GrantType {

    BEARER("Bearer");

    private String type;

    GrantType(String type) {
        this.type = type;
    }

    public static boolean isGrantType(String type) {

        for (GrantType grantType : GrantType.values()) {
            if (grantType.type.equals(type)) {
                return true;
            }
        }

        return false;
    }
}
