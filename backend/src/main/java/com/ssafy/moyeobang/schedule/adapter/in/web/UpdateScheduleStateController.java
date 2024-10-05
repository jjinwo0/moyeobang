package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleStateUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class UpdateScheduleStateController {

    private final UpdateScheduleStateUseCase updateScheduleStateUseCase;

    @PatchMapping("/schedule/{scheduleId}/complete")
    public ApiResult<Boolean> updateTravelSchedule(@PathVariable long scheduleId) {
        updateScheduleStateUseCase.updateScheduleState(scheduleId);
        return success(true);
    }

}
