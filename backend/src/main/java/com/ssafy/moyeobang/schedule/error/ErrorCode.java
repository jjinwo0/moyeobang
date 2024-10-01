package com.ssafy.moyeobang.schedule.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    TRAVEL_SCHEDULE_NOT_FOUND(HttpStatus.BAD_REQUEST, 2001, "참여한 여행이 없습니다."),
    TRAVEL_NOT_FOUND(HttpStatus.BAD_REQUEST, 2002, "해당 여행을 찾을 수 없습니다.");


    private final HttpStatus status;
    private final int code;
    private final String message;
}
