package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.response.TravelScheduleResponse;
import com.ssafy.moyeobang.schedule.application.port.in.GetTravelSchedulesUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class GetTravelSchedulesController {

    private final GetTravelSchedulesUseCase getTravelSchedulesUseCase;

    @GetMapping("/{travelId}/schedules")
    public ApiResult<TravelScheduleResponse> getTravelSchedules(@PathVariable long travelId) {
        return success(getTravelSchedulesUseCase.getTravelSchedules(travelId));
    }
}
