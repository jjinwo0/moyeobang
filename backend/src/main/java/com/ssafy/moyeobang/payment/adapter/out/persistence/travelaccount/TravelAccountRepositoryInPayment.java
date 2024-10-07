package com.ssafy.moyeobang.payment.adapter.out.persistence.travelaccount;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepositoryInPayment extends JpaRepository<TravelAccountJpaEntity, Long> {

    Optional<TravelAccountJpaEntity> findByAccountNumber(String accountNumber);
}
