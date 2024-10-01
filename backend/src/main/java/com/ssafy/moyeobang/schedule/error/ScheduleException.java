package com.ssafy.moyeobang.schedule.error;

import lombok.Getter;

@Getter
public class ScheduleException extends RuntimeException {

    private final ErrorCode errorCode;

    public ScheduleException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
