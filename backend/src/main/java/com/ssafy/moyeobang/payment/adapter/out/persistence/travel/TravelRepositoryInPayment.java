package com.ssafy.moyeobang.payment.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepositoryInPayment extends JpaRepository<TravelJpaEntity, Long> {
}
