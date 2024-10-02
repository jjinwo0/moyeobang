package com.ssafy.moyeobang.schedule.application.domain;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class Schedule {
    private long travelId;
    private long scheduleId;
    private String title;
    private LocalDateTime scheduleStartTime;
    private int budget;
    private ScheduleStatus completion;
    private String imageUrl;
    private String memo;
    private Location location;
    private int sequence;
    private Transaction transaction;

    public static Schedule create(long travelId, long scheduleId, String title,
                                  LocalDateTime scheduleStartTime,
                                  int budget, ScheduleStatus completion, String imageUrl,
                                  String memo, Location location,
                                  int sequence, Transaction transaction
    ) {
        return new Schedule(travelId, scheduleId, title, scheduleStartTime, budget, completion, imageUrl, memo,
                location, sequence, transaction);
    }
}
