package com.ssafy.moyeobang.settle.error;

public class TransactionNotFoundException extends EntityNotFoundException {

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
