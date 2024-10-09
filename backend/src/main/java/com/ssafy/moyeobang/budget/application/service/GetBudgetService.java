package com.ssafy.moyeobang.budget.application.service;

import com.ssafy.moyeobang.budget.adapter.in.web.response.GetBudgetResponse;
import com.ssafy.moyeobang.budget.application.domain.Budget;
import com.ssafy.moyeobang.budget.application.port.in.GetBudgetQuery;
import com.ssafy.moyeobang.budget.application.port.out.LoadBudgetPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class GetBudgetService implements GetBudgetQuery {

    private final LoadBudgetPort loadBudgetPort;

    @Override
    public GetBudgetResponse getBudget(Long scheduleId) {
        Budget budget = loadBudgetPort.loadBudget(scheduleId);

        return new GetBudgetResponse(
                budget.amount()
        );
    }
}
