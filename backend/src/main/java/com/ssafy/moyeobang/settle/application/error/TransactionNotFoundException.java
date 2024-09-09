package com.ssafy.moyeobang.settle.application.error;

public class TransactionNotFoundException extends EntityNotFoundException{

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
