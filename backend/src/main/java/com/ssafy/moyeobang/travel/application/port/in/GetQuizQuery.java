package com.ssafy.moyeobang.travel.application.port.in;

import com.ssafy.moyeobang.travel.adapter.in.web.response.GetQuizQuestionResponse;

public interface GetQuizQuery {

    GetQuizQuestionResponse getQuizQuestion(Long travelId);
}
