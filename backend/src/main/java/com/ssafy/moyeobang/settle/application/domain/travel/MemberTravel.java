package com.ssafy.moyeobang.settle.application.domain.travel;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberTravel {

    private Long id;

    private Integer balance;

    private MappingInfo mappingInfo;

    public static MemberTravel of (Long id, Integer balance, MappingInfo mappingInfo) {

        return new MemberTravel(id, balance, mappingInfo);
    }

    public record MappingInfo(Long memberId, Long travelId) {}
}
