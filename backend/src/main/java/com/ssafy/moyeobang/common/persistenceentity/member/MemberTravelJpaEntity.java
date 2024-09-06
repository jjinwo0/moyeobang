package com.ssafy.moyeobang.common.persistenceentity.member;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member_travel")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTravelJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_travel_id")
    private Long id;

    private long balance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberJpaEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id")
    private TravelJpaEntity travel;

    @Builder
    public MemberTravelJpaEntity(long balance, MemberJpaEntity member, TravelJpaEntity travel) {
        this.balance = balance;
        this.member = member;
        this.travel = travel;
    }
}
