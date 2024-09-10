package com.ssafy.moyeobang.common.persistenceentity.member;

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
@Table(name = "member_account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberAccountJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_account_id")
    private Long id;

    private String bankName;

    private String accountNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberJpaEntity member;

    @Builder
    public MemberAccountJpaEntity(String bankName, String accountNumber, MemberJpaEntity member) {
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.member = member;
    }
}
