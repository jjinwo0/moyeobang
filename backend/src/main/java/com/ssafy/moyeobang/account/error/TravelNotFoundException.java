package com.ssafy.moyeobang.account.error;

public class TravelNotFoundException extends RuntimeException {

    public TravelNotFoundException() {
        super("여행을 찾을 수 없습니다.");
    }
}
