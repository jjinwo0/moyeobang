package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.web.multipart.MultipartFile;


public record CreateTravelScheduleRequest(String scheduleTitle, LocationInfo scheduleLocation,
                                          @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime scheduleTime,
                                          String memo) {
    public CreateTravelScheduleCommand toCommand(long travelId, MultipartFile imageFile) throws IOException {
        return new CreateTravelScheduleCommand(
                travelId,
                scheduleTitle,
                scheduleLocation.toCommand(),
                scheduleTime,
                memo,
                imageFile
        );
    }
}
