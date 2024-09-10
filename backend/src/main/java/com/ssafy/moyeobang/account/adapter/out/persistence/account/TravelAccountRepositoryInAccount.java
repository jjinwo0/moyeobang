package com.ssafy.moyeobang.account.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepositoryInAccount extends JpaRepository<TravelAccountJpaEntity, Long> {

    Optional<TravelAccountJpaEntity> findByAccountNumber(String accountNumber);
}
