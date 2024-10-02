package com.ssafy.moyeobang.schedule.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Participant {

    private Long memberId;

    public static Participant of(Long memberId) {
        return new Participant(memberId);
    }
}
