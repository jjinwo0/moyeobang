package com.ssafy.moyeobang.account.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepositoryInAccount extends JpaRepository<TravelJpaEntity, Long> {
}
