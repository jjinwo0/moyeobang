package com.ssafy.moyeobang.notification.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Travel {

    private Long id;

    private String title;

    private String travelKey;

    public static Travel of(Long id, String title, String travelKey) {
        return new Travel(id, title, travelKey);
    }
}
