package com.ssafy.moyeobang.budget.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepositoryInBudget extends JpaRepository<ScheduleJpaEntity, Long> {
}
