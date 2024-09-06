package com.ssafy.moyeobang.common.persistenceentity.travel;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelAccountJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_account_id")
    private Long id;

    private String accountNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id")
    private TravelJpaEntity travel;

    @Builder
    public TravelAccountJpaEntity(String accountNumber, TravelJpaEntity travel) {
        this.accountNumber = accountNumber;
        this.travel = travel;
    }
}
