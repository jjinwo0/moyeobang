package com.ssafy.moyeobang.travel.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.travel.adapter.in.web.request.ParticipateTravelRequest;
import com.ssafy.moyeobang.travel.application.port.in.ParticipateTravelCommand;
import com.ssafy.moyeobang.travel.application.port.in.ParticipateTravelUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class ParticipateTravelController {

    private final ParticipateTravelUseCase participateTravelUseCase;

    @PostMapping("/api/travels/{travelId}/participate")
    public ApiResult<Boolean> participateTravel(@PathVariable("travelId") Long travelId,
                                                @RequestBody ParticipateTravelRequest request) {
        ParticipateTravelCommand command = new ParticipateTravelCommand(
                travelId,
                request.memberId()
        );

        return success(participateTravelUseCase.participateTravel(command));
    }
}
