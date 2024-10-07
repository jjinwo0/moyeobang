package com.ssafy.moyeobang.payment.application.domain;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ScheduleLocation {
    private final long scheduleId;
    private final Double latitude;
    private final Double longitude;
    private final int sequence;
    private final ScheduleStatus status;

    public static ScheduleLocation of(long scheduleId, Double latitude, Double longitude, int sequence,
                                      ScheduleStatus status) {
        return new ScheduleLocation(scheduleId, latitude, longitude, sequence, status);
    }
}
