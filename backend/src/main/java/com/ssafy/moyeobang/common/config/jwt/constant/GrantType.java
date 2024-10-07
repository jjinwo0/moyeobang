package com.ssafy.moyeobang.common.config.jwt.constant;

public enum GrantType {

    BEARER("Bearer");

    GrantType(String type) {
        this.type = type;
    }

    private String type;
}
