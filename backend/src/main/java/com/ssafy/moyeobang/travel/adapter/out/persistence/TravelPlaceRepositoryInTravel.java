package com.ssafy.moyeobang.travel.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlaceRepositoryInTravel extends JpaRepository<TravelPlaceJpaEntity, Long> {
}
