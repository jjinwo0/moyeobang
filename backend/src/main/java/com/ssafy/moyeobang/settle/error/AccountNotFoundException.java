package com.ssafy.moyeobang.settle.error;

import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;

public class AccountNotFoundException extends EntityNotFoundException {

    public AccountNotFoundException(String message) {
        super(message);
    }
}
