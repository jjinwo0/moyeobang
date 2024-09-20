package com.ssafy.moyeobang.settle.error;

public class AccountNotFoundException extends EntityNotFoundException {

    public AccountNotFoundException(String message) {
        super(message);
    }
}
