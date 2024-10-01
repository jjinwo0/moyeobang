package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepositoryInSchedule extends JpaRepository<ScheduleJpaEntity, Long> {
    Optional<List<ScheduleJpaEntity>> findByTravelId(Long scheduleId);
}
