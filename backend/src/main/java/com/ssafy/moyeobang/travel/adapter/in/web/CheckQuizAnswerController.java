package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.request.CheckQuizAnswerRequest;
import com.ssafy.moyeobang.travel.application.port.in.CheckQuizAnswerCommand;
import com.ssafy.moyeobang.travel.application.port.in.CheckQuizAnswerUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CheckQuizAnswerController {

    private final CheckQuizAnswerUseCase checkQuizAnswerUseCase;

    @PostMapping("/api/travels/{travelId}/quiz")
    public ApiResult<Boolean> checkQuizAnswer(@PathVariable("travelId") Long travelId,
                                              @RequestParam Long memberId,
                                              @RequestBody CheckQuizAnswerRequest request) {
        CheckQuizAnswerCommand command = new CheckQuizAnswerCommand(travelId, memberId, request.answer());

        return success(checkQuizAnswerUseCase.checkQuizAnswer(command));
    }
}
