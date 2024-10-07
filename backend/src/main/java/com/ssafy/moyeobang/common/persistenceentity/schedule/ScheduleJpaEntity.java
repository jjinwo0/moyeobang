package com.ssafy.moyeobang.common.persistenceentity.schedule;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.schedule.application.port.in.SchedulesSequenceCommand;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schedule")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @Column(name = "schedule_title")
    private String scheduleTitle;

    private LocalDateTime startDateTime;

    private String title;

    private String address;

    private String googlePlaceId;

    @Column(name = "is_matched_transaction")
    private boolean isMatchedTransaction = false;

    private int budget;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus complete;

    private String imageUrl;

    private String memo;

    private double latitude;

    private double longitude;

    private int sequence;

    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id")
    private TravelJpaEntity travel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "withdraw_id")
    private WithdrawJpaEntity withdraw;

    @Builder
    public ScheduleJpaEntity(String scheduleTitle,
                             LocalDateTime startDateTime,
                             String title,
                             String address,
                             boolean isMatchedTransaction,
                             int budget,
                             ScheduleStatus complete,
                             String imageUrl,
                             String memo,
                             double latitude,
                             double longitude,
                             String googlePlaceId,
                             int sequence,
                             String category,
                             TravelJpaEntity travel,
                             WithdrawJpaEntity withdraw) {
        this.scheduleTitle = scheduleTitle;
        this.startDateTime = startDateTime;
        this.title = title;
        this.isMatchedTransaction = isMatchedTransaction;
        this.address = address;
        this.budget = budget;
        this.complete = complete;
        this.imageUrl = imageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.googlePlaceId = googlePlaceId;
        this.memo = memo;
        this.sequence = sequence;
        this.category = category;
        this.travel = travel;
        this.withdraw = withdraw;
    }

    public void updateSchedule(String scheduleTitle, LocalDateTime startDateTime, String title, String address,
                               double latitude,
                               double longitude, String googlePlaceId, String memo, String imageUrl) {
        this.scheduleTitle = scheduleTitle;
        this.startDateTime = startDateTime;
        this.title = title;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.googlePlaceId = googlePlaceId;
        this.memo = memo;
        this.imageUrl = imageUrl;
    }

    public void updateComplete() {
        if (this.complete == ScheduleStatus.COMPLETE) {
            this.complete = ScheduleStatus.INCOMPLETE;
        } else {
            this.complete = ScheduleStatus.COMPLETE;
        }
    }

    public void matchingTransaction(WithdrawJpaEntity withdraw) {
        this.isMatchedTransaction = true;
        this.complete = ScheduleStatus.COMPLETE;
        this.withdraw = withdraw;
    }

    public void updateSequence(int newSequence) {
        this.sequence = newSequence;
    }

    public static void updateScheduleSequences(List<ScheduleJpaEntity> schedules,
                                               List<SchedulesSequenceCommand> sequenceCommands) {
        for (SchedulesSequenceCommand sequenceCommand : sequenceCommands) {
            schedules.stream()
                    .filter(schedule -> schedule.getId().equals(Long.parseLong(sequenceCommand.scheduleId())))
                    .findFirst()
                    .ifPresent(schedule -> schedule.updateSequence(sequenceCommand.sequence()));
        }
    }

}
