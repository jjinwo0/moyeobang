package com.ssafy.moyeobang.settle.error;

import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;

public class TransactionNotFoundException extends EntityNotFoundException {

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
