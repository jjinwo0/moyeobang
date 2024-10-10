package com.ssafy.moyeobang.account.application.domain;

import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Travel {

    private Long id;

    private LocalDate endTime;

    public static Travel of(Long id, LocalDate endTime) {

        return new Travel(id, endTime);
    }
}
