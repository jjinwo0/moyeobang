package com.ssafy.moyeobang.notification.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberTravel {

    private Long id;

    private Long travelId;

    private Long memberId;

    private long balance;

    public static MemberTravel of(Long id, Long travelId, Long memberId, long balance) {

        return new MemberTravel(id, travelId, memberId, balance);
    }
}
