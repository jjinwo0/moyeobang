package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import java.time.LocalDateTime;

public record UpdateTravelScheduleRequest(String scheduleTitle, LocationInfo scheduleLocation,
                                          @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime scheduleTime,
                                          String memo, String image_url) {

    public UpdateTravelScheduleCommand toCommand(long travelId, long scheduleId) {
        return new UpdateTravelScheduleCommand(
                travelId,
                scheduleId,
                scheduleTitle,
                scheduleLocation.toCommand(),
                scheduleTime,
                memo,
                image_url
        );
    }
}
