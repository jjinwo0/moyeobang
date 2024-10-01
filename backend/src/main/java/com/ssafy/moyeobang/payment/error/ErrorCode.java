package com.ssafy.moyeobang.payment.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    TRAVEL_ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, 2001, "여행 계좌를 찾을 수 없습니다."),
    TRAVEL_ACCOUNT_CANNOT_ACCESS(HttpStatus.BAD_REQUEST, 2002, "싸피 뱅크에서 해당 계좌에 접근할 수 없습니다."),
    NO_MEMBER_IN_TRAVEL(HttpStatus.NOT_FOUND, 2003, "여행 계좌에 참여된 참여자들을 찾을 수 없습니다."),
    INSUFFICIENT_BALANCE_IN_TRAVEL_ACCOUNT(HttpStatus.NOT_FOUND, 2004, "여행 계좌에 잔액이 부족합니다."),
    CANT_ACCESS_PG_SERVER(HttpStatus.BAD_GATEWAY, 2005, "PG 서버에 연결 할 수 없습니다.");


    private final HttpStatus status;
    private final int code;
    private final String message;
}
