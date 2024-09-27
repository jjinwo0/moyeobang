package com.ssafy.moyeobang.travel.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.travel.application.domain.BackgroundImage;
import jakarta.validation.constraints.NotNull;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

public record CreateTravelInCommand(@NotNull Long memberId,
                                    @NotNull String title,
                                    @NotNull LocalDate startDate,
                                    @NotNull LocalDate endDate,
                                    @NotNull List<String> travelPlaces,
                                    @NotNull String quizQuestion,
                                    @NotNull String quizAnswer,
                                    BackgroundImage backgroundImage) {

    public CreateTravelInCommand(Long memberId,
                                 String title,
                                 LocalDate startDate,
                                 LocalDate endDate,
                                 List<String> travelPlaces,
                                 String quizQuestion,
                                 String quizAnswer,
                                 String fileName,
                                 String contentType,
                                 InputStream inputStream,
                                 long size) {
        this(
                memberId,
                title,
                startDate,
                endDate,
                travelPlaces,
                quizQuestion,
                quizAnswer,
                new BackgroundImage(fileName, contentType, inputStream, size)
        );

        validate(this);
    }
}
