package com.ssafy.moyeobang.schedule.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepositoryInSchedule extends JpaRepository<TravelJpaEntity, Long> {
}
