package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleBudgetPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class UpdateScheduleBudgetAdapter implements UpdateScheduleBudgetPort {

    private final ScheduleJpaRepositoryInSchedule scheduleRepository;

    @Override
    public void updateScheduleBudget(long scheduleId, long budget) {
        scheduleRepository.findById(scheduleId).ifPresent(schedule -> {
            schedule.updateBudget(budget);
        });
    }
}
