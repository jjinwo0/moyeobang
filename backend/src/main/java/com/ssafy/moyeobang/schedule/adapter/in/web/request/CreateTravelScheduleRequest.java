package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import java.time.LocalDateTime;


public record CreateTravelScheduleRequest(String scheduleTitle, LocationInfo location,
                                          @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime scheduleTime,
                                          String memo, String image_url) {

    public CreateTravelScheduleCommand toCommand(long travelId) {
        return new CreateTravelScheduleCommand(
                travelId,
                scheduleTitle,
                location.toCommand(),
                scheduleTime,
                memo,
                image_url
        );
    }
}
