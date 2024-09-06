package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.settle.application.domain.account.AccountType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "travel_account")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelAccountEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_account_id")
    private Long id;

    private String uuid;

    private String bankCode;

    private String bankName;

    private Long typeCode;

    private String typeName;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "travel_id")
    private TravelEntity travelEntity;
}
