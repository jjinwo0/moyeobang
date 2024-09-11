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

    private String title;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private String address;

    private int budget;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus complete;

    private String imageUrl;

    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id")
    private TravelJpaEntity travel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "withdraw_id")
    private WithdrawJpaEntity withdraw;

    @Builder
    public ScheduleJpaEntity(String title,
                             LocalDateTime startDateTime,
                             LocalDateTime endDateTime,
                             String address,
                             int budget,
                             ScheduleStatus complete,
                             String imageUrl,
                             String memo,
                             TravelJpaEntity travel,
                             WithdrawJpaEntity withdraw) {
        this.title = title;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.address = address;
        this.budget = budget;
        this.complete = complete;
        this.imageUrl = imageUrl;
        this.memo = memo;
        this.travel = travel;
        this.withdraw = withdraw;
    }
}
