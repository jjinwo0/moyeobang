package com.ssafy.moyeobang.account.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepository extends JpaRepository<TravelAccountJpaEntity, Long> {
}
