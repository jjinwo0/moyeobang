package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepositoryInSettle extends JpaRepository<TravelAccountJpaEntity, Long> {
}
