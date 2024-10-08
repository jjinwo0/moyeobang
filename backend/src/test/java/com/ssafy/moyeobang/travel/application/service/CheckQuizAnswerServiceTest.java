package com.ssafy.moyeobang.travel.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import autoparams.AutoSource;
import com.ssafy.moyeobang.travel.application.domain.Member;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.in.CheckQuizAnswerCommand;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.ParticipateTravelPort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;

class CheckQuizAnswerServiceTest {

    private final LoadTravelPort loadTravelPort = mock(LoadTravelPort.class);
    private final ParticipateTravelPort participateTravelPort = mock(ParticipateTravelPort.class);

    private final CheckQuizAnswerService checkQuizAnswerService = new CheckQuizAnswerService(loadTravelPort, participateTravelPort);

    @DisplayName("여행 참가 퀴즈 정답 여부를 확인한다. (정답)")
    @ParameterizedTest
    @AutoSource
    void checkQuizAnswerIsCorrect(Travel travel, Member member) {
        //given
        given(loadTravelPort.loadTravel(any(Long.class)))
                .willReturn(travel);

        CheckQuizAnswerCommand command = new CheckQuizAnswerCommand(travel.id(), member.id(), travel.getAnswer());

        //when
        boolean isCorrected = checkQuizAnswerService.checkQuizAnswer(command);

        //then
        assertThat(isCorrected).isTrue();
    }

    @DisplayName("여행 참가 퀴즈 정답 여부를 확인한다. (오답)")
    @ParameterizedTest
    @AutoSource
    void checkQuizAnswerIsWrong(Travel travel, Member member) {
        //given
        given(loadTravelPort.loadTravel(any(Long.class)))
                .willReturn(travel);

        CheckQuizAnswerCommand command = new CheckQuizAnswerCommand(travel.id(), member.id(), "오답");

        //when
        boolean isCorrected = checkQuizAnswerService.checkQuizAnswer(command);

        //then
        assertThat(isCorrected).isFalse();
    }
}