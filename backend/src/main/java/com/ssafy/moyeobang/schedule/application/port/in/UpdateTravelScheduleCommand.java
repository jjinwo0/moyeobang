package com.ssafy.moyeobang.schedule.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import java.time.LocalDateTime;

public record UpdateTravelScheduleCommand(long travelId, long scheduleId, String scheduleTitle,
                                          LocationInfoCommand location,
                                          LocalDateTime scheduleTime,
                                          String memo, String image_url) {

    public UpdateTravelScheduleCommand {
        validate(this);
    }
}
