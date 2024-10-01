package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.UpdateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class UpdateTravelScheduleController {

    private final UpdateTravelScheduleUseCase updateTravelScheduleUseCase;

    @PutMapping("/{travelId}/schedule/{scheduleId}")
    public ApiResult<Boolean> updateTravelSchedule(@PathVariable long travelId, @PathVariable long scheduleId,
                                                   @RequestBody
                                                   UpdateTravelScheduleRequest updateTravelScheduleRequest) {
        UpdateTravelScheduleCommand command = updateTravelScheduleRequest.toCommand(travelId, scheduleId);
        updateTravelScheduleUseCase.updateTravelSchedule(command);
        return success(true);
    }
}
