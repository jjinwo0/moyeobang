package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepositoryInTravel extends JpaRepository<TravelJpaEntity, Long>, TravelQueryRepository {
}
