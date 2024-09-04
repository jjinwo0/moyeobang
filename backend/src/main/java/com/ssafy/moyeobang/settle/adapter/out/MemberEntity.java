package com.ssafy.moyeobang.settle.adapter.out;

import com.ssafy.moyeobang.settle.application.domain.Gender;
import com.ssafy.moyeobang.settle.application.domain.MemberType;
import com.ssafy.moyeobang.settle.application.domain.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEntity {

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
}
