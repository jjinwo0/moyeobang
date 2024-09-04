package com.ssafy.moyeobang.settle.adapter.out;

import com.ssafy.moyeobang.settle.application.domain.AccountType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
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
}
