package com.ssafy.moyeobang.common.error.exception;

import lombok.Getter;

@Getter
public class EntityNotFoundException extends RuntimeException {

    // todo: errorCode 생성
    private String message;

    public EntityNotFoundException(String message) {

        super(message);
        this.message = message;
    }
}
