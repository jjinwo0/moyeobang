package com.ssafy.moyeobang.travel.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;

public record ParticipateTravelCommand(@NotNull Long travelId,
                                       @NotNull Long memberId) {

    public ParticipateTravelCommand(Long travelId, Long memberId) {
        this.travelId = travelId;
        this.memberId = memberId;

        validate(this);
    }
}
