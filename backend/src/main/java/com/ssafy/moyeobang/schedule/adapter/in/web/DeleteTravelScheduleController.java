package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.application.port.in.DeleteTravelScheduleUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class DeleteTravelScheduleController {

    private final DeleteTravelScheduleUseCase deleteTravelScheduleUseCase;

    @DeleteMapping("/schedule/{scheduleId}")
    public ApiResult<Boolean> deleteTravelSchedule(
            @PathVariable("scheduleId") long scheduleId) {
        deleteTravelScheduleUseCase.deleteTravelSchedule(scheduleId);
        return success(true);
    }

}
