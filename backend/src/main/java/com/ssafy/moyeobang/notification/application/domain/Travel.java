package com.ssafy.moyeobang.notification.application.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Travel {

    private Long id;

    private String title;

    public static Travel of(Long id, String title) {
        return new Travel(id, title);
    }
}
