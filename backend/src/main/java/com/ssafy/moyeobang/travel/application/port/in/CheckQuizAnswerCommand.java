package com.ssafy.moyeobang.travel.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;

public record CheckQuizAnswerCommand(@NotNull Long travelId,
                                     @NotNull Long memberId,
                                     @NotNull String answer) {

    public CheckQuizAnswerCommand(Long travelId, Long memberId, String answer) {
        this.travelId = travelId;
        this.memberId = memberId;
        this.answer = answer;

        validate(this);
    }
}
