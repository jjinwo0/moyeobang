package com.ssafy.moyeobang.travel.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.in.GetQuizQuery;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class QuizService implements GetQuizQuery {

    private final LoadTravelPort loadTravelPort;

    @Override
    public String getQuizQuestion(Long travelId) {
        Travel travel = loadTravelPort.loadTravel(travelId);

        return travel.getQuestion();
    }
}
