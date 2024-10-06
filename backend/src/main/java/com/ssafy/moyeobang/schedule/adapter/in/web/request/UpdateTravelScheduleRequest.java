package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.web.multipart.MultipartFile;

public record UpdateTravelScheduleRequest(String scheduleTitle, LocationInfo scheduleLocation,
                                          @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime scheduleTime,
                                          String memo) {

    public UpdateTravelScheduleCommand toCommand(long travelId, long scheduleId, MultipartFile imageFile)
            throws IOException {
        return new UpdateTravelScheduleCommand(
                travelId,
                scheduleId,
                scheduleTitle,
                scheduleLocation.toCommand(),
                scheduleTime,
                memo,
                imageFile
        );
    }
}
