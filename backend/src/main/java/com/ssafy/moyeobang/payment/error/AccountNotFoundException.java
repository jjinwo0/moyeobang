package com.ssafy.moyeobang.payment.error;

public class AccountNotFoundException extends RuntimeException {
    public AccountNotFoundException() {
        super("여행 계좌를 찾을 수 없습니다.");
    }
}
