package com.ssafy.moyeobang.budget.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.budget.adapter.in.web.response.GetBudgetResponse;
import com.ssafy.moyeobang.budget.application.port.in.GetBudgetQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetBudgetController {

    private final GetBudgetQuery getBudgetQuery;

    @GetMapping("/api/travel/schedule/{scheduleId}/budget")
    public ApiResult<GetBudgetResponse> getBudget(@PathVariable Long scheduleId) {
        return success(getBudgetQuery.getBudget(scheduleId));
    }
}
