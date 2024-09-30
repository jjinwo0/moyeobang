package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.UpdateTravelScheduleRequest;
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

    @PutMapping("/{travelId}/schedule/{scheduleId}")
    public ApiResult<?> updateTravelSchedule(@PathVariable long travelId, @PathVariable long scheduleId, @RequestBody
    UpdateTravelScheduleRequest updateTravelScheduleRequest) {
        return success(true);
    }
}
