package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.response.GetQuizQuestionResponse;
import com.ssafy.moyeobang.travel.application.port.in.GetQuizQuestionQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetQuizQuestionController {

    private final GetQuizQuestionQuery getQuizQuestionQuery;

    @GetMapping("/api/travels/{travelId}/quiz")
    public ApiResult<GetQuizQuestionResponse> getQuizQuestion(@PathVariable Long travelId) {
        return success(getQuizQuestionQuery.getQuizQuestion(travelId));
    }
}
