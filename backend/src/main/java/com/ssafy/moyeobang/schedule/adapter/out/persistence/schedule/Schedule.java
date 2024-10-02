package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class Schedule {
    private final long scheduleId;
    private final String scheduleTitle;
    private final LocalDateTime startDateTime;
    private final String title;
    private final String address;
    private final String googlePlaceId;
    private final boolean isMatchedTransaction;
    private final long budget;
    private final String complete;
    private final String imageUrl;
    private final String memo;
    private final Double latitude;
    private final Double longitude;
    private final Integer sequence;
    private final Long travelId;
    private final Long withdrawId;
    private final String withdrawTitle;

    @QueryProjection
    public Schedule(long scheduleId, String scheduleTitle, LocalDateTime startDateTime, String title, String address,
                    String googlePlaceId, boolean isMatchedTransaction, long budget, String complete, String imageUrl,
                    String memo, Double latitude, Double longitude, Integer sequence, Long travelId, Long withdrawId,
                    String withdrawTitle) {
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
        this.withdrawId = withdrawId;
        this.withdrawTitle = withdrawTitle;
    }
}
