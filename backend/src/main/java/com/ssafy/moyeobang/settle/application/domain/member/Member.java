package com.ssafy.moyeobang.settle.application.domain.member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Member {

    private final MemberUnique memberUnique;

    private final MemberInfo memberInfo;

    private final PersonalInfo personalInfo;

    /* 당장은 필요없는 데이터 */
//    private final String profile;
//
//    private final MemberType memberType;
//
//    private final Role role;

    public static Member of(final MemberUnique memberUnique,
                            final MemberInfo memberInfo,
                            final PersonalInfo personalInfo) {

        return new Member(
                memberUnique,
                memberInfo,
                personalInfo
        );
    }

    public record MemberUnique(Long id, String memberKey) { }

    public record MemberInfo(String email, String username, String nickname) { }

    public record PersonalInfo(String birth, Gender gender, Integer age) { }
}
