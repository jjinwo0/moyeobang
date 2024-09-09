package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.settle.adapter.out.persistence.account.TravelAccountEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "deposit")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepositEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deposit_id")
    private Long id;

    private Integer amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_account_id")
    private TravelAccountEntity travelAccountEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;
}
