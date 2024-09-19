package com.ssafy.moyeobang.settle.application.domain.travel;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Travel {

    private Long id;

    private String title;

    private Map<Long, Long> memberBalanceMap;

    public static Travel of(Long id, String title, Map<Long, Long> memberBalance) {

        return new Travel(id, title, memberBalance);
    }
}
