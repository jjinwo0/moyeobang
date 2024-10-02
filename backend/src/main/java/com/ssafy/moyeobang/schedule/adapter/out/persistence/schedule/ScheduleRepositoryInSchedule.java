package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepositoryInSchedule {
    Optional<List<ScheduleJpaEntity>> findByTravelId(Long scheduleId);

    List<Schedule> findSchedulesByTravelId(Long travelId);
}
