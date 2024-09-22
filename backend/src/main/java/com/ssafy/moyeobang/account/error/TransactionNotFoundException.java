package com.ssafy.moyeobang.account.error;

public class TransactionNotFoundException extends RuntimeException {

    public TransactionNotFoundException() {
        super("이체 내역을 찾을 수 없습니다.");
    }
}
