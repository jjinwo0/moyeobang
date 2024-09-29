package com.ssafy.moyeobang.travel.application.port.out;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public record UpdateTravelOutCommand(@NotNull Long travelId,
                                     @NotNull String title,
                                     @NotNull LocalDate startDate,
                                     @NotNull LocalDate endDate,
                                     @NotNull List<String> travelPlaces,
                                     @NotNull String quizQuestion,
                                     @NotNull String quizAnswer,
                                     String backgroundImageUrl) {

    public UpdateTravelOutCommand(Long travelId,
                                  String title,
                                  LocalDate startDate,
                                  LocalDate endDate,
                                  List<String> travelPlaces,
                                  String quizQuestion,
                                  String quizAnswer,
                                  String backgroundImageUrl) {
        this.travelId = travelId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.travelPlaces = travelPlaces;
        this.quizQuestion = quizQuestion;
        this.quizAnswer = quizAnswer;
        this.backgroundImageUrl = backgroundImageUrl;

        validate(this);
    }
}
