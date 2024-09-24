package com.ssafy.moyeobang.travel.application.port.out;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record CreateTravelOutCommand(@NotNull String title,
                                     @NotNull LocalDate startDate,
                                     @NotNull LocalDate endDate,
                                     @NotNull List<String> travelPlaces,
                                     @NotNull String quizQuestion,
                                     @NotNull String quizAnswer,
                                     String backgroundImageUrl) {

    public CreateTravelOutCommand {
        validate(this);
    }
}
