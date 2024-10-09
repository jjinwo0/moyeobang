package com.ssafy.moyeobang.budget.application.port.in;

import com.ssafy.moyeobang.budget.adapter.in.web.response.GetBudgetResponse;

public interface GetBudgetQuery {

    GetBudgetResponse getBudget(Long scheduleId);
}
