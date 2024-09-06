package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTravel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_travel_id")
    private Long id;

    private BigInteger balance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_id")
    private TravelEntity travelEntity;
}
