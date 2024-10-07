package com.ssafy.moyeobang.travel.error;

public class TravelNotFoundException extends RuntimeException {

    public TravelNotFoundException() {
        super("여행을 찾을 수 없습니다.");
    }
}
