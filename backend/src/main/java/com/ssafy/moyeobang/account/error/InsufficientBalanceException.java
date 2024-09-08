package com.ssafy.moyeobang.account.error;

public class InsufficientBalanceException extends RuntimeException {

    public InsufficientBalanceException() {
        super("잔액이 부족합니다.");
    }
}
