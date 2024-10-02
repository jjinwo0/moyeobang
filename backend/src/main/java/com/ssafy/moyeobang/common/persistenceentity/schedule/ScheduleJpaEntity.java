package com.ssafy.moyeobang.common.persistenceentity.schedule;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
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
}
