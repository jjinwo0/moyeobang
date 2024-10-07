package com.ssafy.moyeobang.schedule.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.UpdateScheduleBudgetRequest;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleBudgetUseCase;
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
public class UpdateScheduleBudgetController {

    private final UpdateScheduleBudgetUseCase updateScheduleBudgetUseCase;

    @PostMapping("/schedule/{scheduleId}/budget")
    public ApiResult<Boolean> getTravelSchedules(@PathVariable long scheduleId,
                                                 @RequestBody UpdateScheduleBudgetRequest request) {
        updateScheduleBudgetUseCase.updateScheduleBudget(scheduleId, request.budget());
        return success(true);
    }
}
