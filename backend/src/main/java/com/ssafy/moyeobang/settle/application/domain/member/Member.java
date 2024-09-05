package com.ssafy.moyeobang.settle.application.domain.member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Member {

    private final Long id;

    private final String email;

    private final String username;

    private final String nickname;

    private final String birth;

    private final Gender gender;

    private final Integer age;

    /* 당장은 필요없는 데이터 */
//    private final String profile;
//
//    private final MemberType memberType;
//
//    private final Role role;

    private final String memberKey;

    public static Member of(Long id, String email, String username, String nickname, String birth, Gender gender, Integer age, String memberKey) {

        return new Member(id, email, username, nickname, birth, gender, age, memberKey);
    }
}
