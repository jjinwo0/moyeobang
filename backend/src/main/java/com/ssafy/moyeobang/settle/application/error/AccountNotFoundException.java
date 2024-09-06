package com.ssafy.moyeobang.settle.application.error;

public class AccountNotFoundException extends EntityNotFoundException{

    public AccountNotFoundException(String message) {
        super(message);
    }
}
