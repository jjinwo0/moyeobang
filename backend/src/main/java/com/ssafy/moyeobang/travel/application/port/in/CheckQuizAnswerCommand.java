package com.ssafy.moyeobang.travel.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;

public record CheckQuizAnswerCommand(@NotNull Long travelId,
                                     @NotNull String answer) {

    public CheckQuizAnswerCommand(Long travelId, String answer) {
        this.travelId = travelId;
        this.answer = answer;

        validate(this);
    }
}
