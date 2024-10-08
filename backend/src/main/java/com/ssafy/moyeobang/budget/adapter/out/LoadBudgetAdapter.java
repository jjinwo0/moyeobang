package com.ssafy.moyeobang.budget.adapter.out;

import com.ssafy.moyeobang.budget.application.domain.Budget;
import com.ssafy.moyeobang.budget.application.port.out.LoadBudgetPort;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadBudgetAdapter implements LoadBudgetPort {

    @Override
    public Budget loadBudget(Long scheduleId) {
        return null;
    }
}
