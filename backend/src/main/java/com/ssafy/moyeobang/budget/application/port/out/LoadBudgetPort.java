package com.ssafy.moyeobang.budget.application.port.out;

import com.ssafy.moyeobang.budget.application.domain.Budget;

public interface LoadBudgetPort {

    Budget loadBudget(Long scheduleId);
}
