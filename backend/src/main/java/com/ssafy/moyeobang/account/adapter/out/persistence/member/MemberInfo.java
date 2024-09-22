package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MemberInfo {

    private final Long id;
    private final String name;
    private final String profileImage;
    private final String memberKey;
    private final String accountNumber;

    @QueryProjection
    public MemberInfo(Long id,
                      String name,
                      String profileImage,
                      String memberKey,
                      String accountNumber) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
        this.memberKey = memberKey;
        this.accountNumber = accountNumber;
    }
}
