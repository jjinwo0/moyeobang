package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class ScheduleInfo {
    private final Long scheduleId;
    private final String scheduleTitle;
    private final LocalDateTime startDateTime;
    private final String title;
    private final String address;
    private final String googlePlaceId;
    private final Boolean isMatchedTransaction;
    private final Integer budget;
    private final ScheduleStatus complete;
    private final String imageUrl;
    private final String memo;
    private final Double latitude;
    private final Double longitude;
    private final Integer sequence;
    private final Long travelId;
    private final WithdrawInfo withdrawInfo;
    private final List<Long> participantIds;

    @QueryProjection
    public ScheduleInfo(long scheduleId, String scheduleTitle, LocalDateTime startDateTime, String title,
                        String address,
                        String googlePlaceId, boolean isMatchedTransaction, int budget, ScheduleStatus complete,
                        String imageUrl,
                        String memo, Double latitude, Double longitude, Integer sequence, Long travelId,
                        WithdrawInfo withdrawInfo, List<Long> participantIds) {
        this.scheduleId = scheduleId;
        this.scheduleTitle = scheduleTitle;
        this.startDateTime = startDateTime;
        this.title = title;
        this.address = address;
        this.googlePlaceId = googlePlaceId;
        this.isMatchedTransaction = isMatchedTransaction;
        this.budget = budget;
        this.complete = complete;
        this.imageUrl = imageUrl;
        this.memo = memo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.sequence = sequence;
        this.travelId = travelId;
        this.withdrawInfo = withdrawInfo;
        this.participantIds = participantIds;
    }
}
