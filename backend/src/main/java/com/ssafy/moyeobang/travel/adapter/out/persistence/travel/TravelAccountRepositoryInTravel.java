package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepositoryInTravel extends JpaRepository<TravelAccountJpaEntity, Long> {
}
