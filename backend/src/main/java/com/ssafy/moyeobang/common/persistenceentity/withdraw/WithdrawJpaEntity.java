package com.ssafy.moyeobang.common.persistenceentity.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "withdraw", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<OrderJpaEntity> orderJpaEntities = new ArrayList<>();

    @Builder
    public WithdrawJpaEntity(Long id,
                             String title,
                             String address,
                             long amount,
                             String targetAccountNumber,
                             TravelAccountJpaEntity travelAccount) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.amount = amount;
        this.targetAccountNumber = targetAccountNumber;
        this.travelAccount = travelAccount;
    }
}
