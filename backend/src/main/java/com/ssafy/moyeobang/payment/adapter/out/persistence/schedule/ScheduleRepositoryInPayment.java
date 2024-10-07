package com.ssafy.moyeobang.payment.adapter.out.persistence.schedule;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepositoryInPayment extends JpaRepository<ScheduleJpaEntity, Long> {
    List<ScheduleJpaEntity> findByTravelId(Long travelId);
}
