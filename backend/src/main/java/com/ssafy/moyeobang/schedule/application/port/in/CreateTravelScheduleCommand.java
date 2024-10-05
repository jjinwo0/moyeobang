package com.ssafy.moyeobang.schedule.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import java.time.LocalDateTime;

public record CreateTravelScheduleCommand(
        long travelId, String scheduleTitle, LocationInfoCommand scheduleLocation,
        LocalDateTime scheduleTime,
        String memo, String image_url) {

    public CreateTravelScheduleCommand {
        validate(this);
    }
}
