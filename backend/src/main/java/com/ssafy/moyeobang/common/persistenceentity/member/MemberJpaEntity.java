package com.ssafy.moyeobang.common.persistenceentity.member;

import com.ssafy.moyeobang.common.persistenceentity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberJpaEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String username;

    private String birth;

    private int age;

    private String profile;

    private String memberKey;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private LoginType memberType;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String FCMToken;

    @Builder
    public MemberJpaEntity(String email,
                           String username,
                           String birth,
                           int age,
                           String profile,
                           String memberKey,
                           Gender gender,
                           LoginType memberType,
                           Role role,
                           String FCMToken) {
        this.email = email;
        this.username = username;
        this.birth = birth;
        this.age = age;
        this.profile = profile;
        this.memberKey = memberKey;
        this.gender = gender;
        this.memberType = memberType;
        this.role = role;
        this.FCMToken = FCMToken;
    }

    public void saveFCMToken(String token) {

        this.FCMToken = token;
    }
}

