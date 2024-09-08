package com.ssafy.moyeobang.settle.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.util.BaseEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.AccountEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.account.order.MemberOrderHistoryEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.travel.MemberTravelEntity;
import com.ssafy.moyeobang.settle.application.domain.member.Gender;
import com.ssafy.moyeobang.settle.application.domain.member.MemberType;
import com.ssafy.moyeobang.settle.application.domain.member.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEntity extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String username;

    private String nickname;

    private String birth;

    private Gender gender;

    private Integer age;

    private String profile;

    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String memberKey;

    @OneToMany(mappedBy = "memberEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<AccountEntity> accountEntities;

    @OneToMany(mappedBy = "memberEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MemberOrderHistoryEntity> memberOrderHistories;

    @OneToMany(mappedBy = "memberEntity", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<MemberTravelEntity> memberTravelEntities;
}
