package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.CreateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class CreateTravelScheduleController {

    private final CreateTravelScheduleUseCase createTravelScheduleUseCase;

    @PostMapping("/{travelId}/schedule")
    public ApiResult<Boolean> createTravelSchedule(@PathVariable long travelId, @RequestBody
    CreateTravelScheduleRequest createTravelScheduleRequest) {
        CreateTravelScheduleCommand command = createTravelScheduleRequest.toCommand(travelId);

        createTravelScheduleUseCase.createTravelSchedule(command);

        return success(true);
    }
}
