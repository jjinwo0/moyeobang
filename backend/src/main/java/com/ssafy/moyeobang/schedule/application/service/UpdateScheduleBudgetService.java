package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleBudgetUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleBudgetPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class UpdateScheduleBudgetService implements UpdateScheduleBudgetUseCase {

    private final UpdateScheduleBudgetPort updateScheduleBudgetPort;

    @Override
    public void updateScheduleBudget(long scheduleId, long budget) {
        updateScheduleBudgetPort.updateScheduleBudget(scheduleId, budget);
    }
}
