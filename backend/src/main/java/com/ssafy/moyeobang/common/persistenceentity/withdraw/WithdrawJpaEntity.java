package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
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
@Table(name = "withdraw")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WithdrawJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "withdraw_id")
    private Long id;

    private String title;

    private String address;

    private long amount;

    private String targetAccountNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_account_id")
    private TravelAccountJpaEntity travelAccount;

    @Builder
    public WithdrawJpaEntity(String title,
                             String address,
                             long amount,
                             String targetAccountNumber,
                             TravelAccountJpaEntity travelAccount) {
        this.title = title;
        this.address = address;
        this.amount = amount;
        this.targetAccountNumber = targetAccountNumber;
        this.travelAccount = travelAccount;
    }
}
