package com.ssafy.moyeobang.common.persistenceentity.schedule;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ScheduleStatus {

    COMPLETE("완료"),
    INCOMPLETE("진행");

    private final String description;
}
