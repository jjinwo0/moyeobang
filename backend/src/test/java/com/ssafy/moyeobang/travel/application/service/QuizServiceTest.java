package com.ssafy.moyeobang.travel.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import autoparams.AutoSource;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;

class QuizServiceTest {

    private final LoadTravelPort loadTravelPort = mock(LoadTravelPort.class);

    private final QuizService quizService = new QuizService(loadTravelPort);

    @DisplayName("여행 참가 퀴즈 질문을 조회한다.")
    @ParameterizedTest
    @AutoSource
    void getQuizQuestion(Travel travel) {
        //given
        given(loadTravelPort.loadTravel(any(Long.class)))
                .willReturn(travel);

        //when
        String quizQuestion = quizService.getQuizQuestion(travel.id());

        //then
        assertThat(quizQuestion).isEqualTo(travel.getQuestion());
    }
}