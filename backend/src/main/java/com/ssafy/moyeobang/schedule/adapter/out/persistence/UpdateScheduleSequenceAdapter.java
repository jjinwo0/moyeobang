package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.in.SchedulesSequenceCommand;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleSequencePort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class UpdateScheduleSequenceAdapter implements UpdateScheduleSequencePort {

    private final ScheduleJpaRepositoryInSchedule scheduleRepository;

    @Override
    public void updateSchedules(List<SchedulesSequenceCommand> scheduleSequences) {
        List<Long> scheduleIds = scheduleSequences.stream()
                .map(seq -> Long.parseLong(seq.scheduleId()))
                .toList();

        List<ScheduleJpaEntity> schedules = scheduleRepository.findAllByIdIn(scheduleIds);
        ScheduleJpaEntity.updateScheduleSequences(schedules, scheduleSequences);
    }
}
