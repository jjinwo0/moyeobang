package com.ssafy.moyeobang.settle.application.domain.order;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberOrderHistory {

    private final Long id;

    private final int amount;

    private MappingInfo mappingInfo;

    public static MemberOrderHistory of(Long id, Integer amount, MappingInfo mappingInfo) {

        return new MemberOrderHistory(id, amount, mappingInfo);
    }

    public record MappingInfo(Long memberId, Long orderId) {}
}
