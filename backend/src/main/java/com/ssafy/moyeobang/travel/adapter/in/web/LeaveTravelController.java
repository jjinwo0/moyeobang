package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.request.LeaveTravelRequest;
import com.ssafy.moyeobang.travel.application.port.in.LeaveTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.LeaveTravelUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class LeaveTravelController {

    private final LeaveTravelUseCase leaveTravelUseCase;

    @PostMapping("/api/travels/{travelId}/leave")
    public ApiResult<Boolean> leaveTravel(@PathVariable Long travelId,
                                          @RequestBody LeaveTravelRequest request) {
        LeaveTravelCommand command = new LeaveTravelCommand(travelId, request.memberId());

        return success(leaveTravelUseCase.leaveTravel(command));
    }
}
