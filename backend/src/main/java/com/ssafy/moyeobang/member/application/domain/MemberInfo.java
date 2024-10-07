package com.ssafy.moyeobang.member.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfo {

    private Long id;

    private String name;

    private String image;

    private Long accountId;

    private String bankName;

    private String accountNumber;

    public static MemberInfo of(Long id, String name, String image, Long accountId, String bankName, String accountNumber) {

        return new MemberInfo(id, name, image, accountId, bankName, accountNumber);
    }
}
