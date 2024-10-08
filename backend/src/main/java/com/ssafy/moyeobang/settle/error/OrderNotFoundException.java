package com.ssafy.moyeobang.settle.error;

import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;

public class OrderNotFoundException extends EntityNotFoundException {
    public OrderNotFoundException(String message) {
        super(message);
    }
}
