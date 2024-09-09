package com.ssafy.moyeobang.common.persistenceentity.order;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
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
@Table(name = "orders")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    private String title;

    private long amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "withdraw_id")
    private WithdrawJpaEntity withdraw;

    @Builder
    public OrderJpaEntity(String title, long amount, WithdrawJpaEntity withdraw) {
        this.title = title;
        this.amount = amount;
        this.withdraw = withdraw;
    }
}
