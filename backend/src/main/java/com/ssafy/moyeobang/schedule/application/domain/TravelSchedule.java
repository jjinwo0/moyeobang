package com.ssafy.moyeobang.schedule.application.domain;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TravelSchedule {
    private long travelId;
    private String title;
    private LocalDateTime scheduleStartTime;
    private Integer budget;
    private ScheduleStatus completion;
    private String imageUrl;
    private String memo;
    private Location location;
    private Integer sequence;
    private Transaction transaction;


    public static TravelSchedule createNewSchedule(long travelId, String title, LocalDateTime startTime,
                                                   Integer budget, String imageUrl, String memo, Location location,
                                                   int sequence) {
        return new TravelSchedule(travelId, title, startTime, budget, ScheduleStatus.INCOMPLETE, imageUrl, memo,
                location,
                sequence, null);
    }
}
