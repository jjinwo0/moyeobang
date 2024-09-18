package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
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

    private Double latitude;

    private Double longitude;

    private long amount;

    private long balanceSnapshot;

    private String targetAccountNumber;

    private String placeId;

    private String placeName;

    private String placeAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_account_id")
    private TravelAccountJpaEntity travelAccount;

    @OneToMany(mappedBy = "withdraw", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<OrderJpaEntity> orderJpaEntities = new ArrayList<>();

    @Builder
    public WithdrawJpaEntity(String title,
                             Double latitude,
                             Double longitude,
                             long amount,
                             long balanceSnapshot,
                             String targetAccountNumber,
                             TravelAccountJpaEntity travelAccount,
                             String placeId,
                             String placeName,
                             String placeAddress) {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.amount = amount;
        this.balanceSnapshot = balanceSnapshot;
        this.targetAccountNumber = targetAccountNumber;
        this.travelAccount = travelAccount;
        this.placeId = placeId;
        this.placeName = placeName;
        this.placeAddress = placeAddress;
    }
}
