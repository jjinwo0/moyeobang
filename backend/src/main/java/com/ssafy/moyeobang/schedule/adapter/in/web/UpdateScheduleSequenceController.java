package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.ScheduleSequenceRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel")
@RequiredArgsConstructor
public class UpdateScheduleSequenceController {


    @PostMapping("/schedule/sort")
    public ApiResult<Boolean> getTravelSchedules(
            @RequestBody ScheduleSequenceRequest scheduleSequenceRequest) {
        return success(true);
    }
}
