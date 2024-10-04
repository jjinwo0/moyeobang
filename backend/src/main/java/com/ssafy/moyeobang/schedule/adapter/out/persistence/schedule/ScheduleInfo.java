package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
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
    private final String category;
    private final WithdrawInfo withdrawInfo;
    private final List<Long> participantIds;

    @QueryProjection
    public ScheduleInfo(ScheduleJpaEntity schedule,
                        WithdrawJpaEntity withdraw) {
        this.scheduleId = schedule.getId();
        this.scheduleTitle = schedule.getTitle();
        this.startDateTime = schedule.getStartDateTime();
        this.title = schedule.getTitle();
        this.address = schedule.getAddress();
        this.googlePlaceId = schedule.getGooglePlaceId();
        this.isMatchedTransaction = schedule.isMatchedTransaction();
        this.budget = schedule.getBudget();
        this.complete = schedule.getComplete();
        this.imageUrl = schedule.getImageUrl();
        this.memo = schedule.getMemo();
        this.latitude = schedule.getLatitude();
        this.longitude = schedule.getLongitude();
        this.sequence = schedule.getSequence();
        this.travelId = schedule.getTravel().getId();
        this.category = schedule.getCategory();
        this.withdrawInfo = new WithdrawInfo(
                withdraw.getId(),
                withdraw.getTitle(),
                withdraw.getCreatedAt(),
                withdraw.getAmount(),
                withdraw.getLatitude(),
                withdraw.getLongitude(),
                withdraw.getPaymentRequestId(),
                withdraw.getSettleType()
        );
        this.participantIds = withdraw.getParticipantId();
    }
}
