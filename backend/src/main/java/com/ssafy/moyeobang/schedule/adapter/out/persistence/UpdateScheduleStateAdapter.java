package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleStatePort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class UpdateScheduleStateAdapter implements UpdateScheduleStatePort {

    private final ScheduleJpaRepositoryInSchedule scheduleRepository;

    @Override
    public void updateScheduleState(long scheduleId) {
        scheduleRepository.findById(scheduleId).ifPresent(ScheduleJpaEntity::updateComplete);
    }
}
