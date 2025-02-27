package com.ssafy.moyeobang.account.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TravelAccountRepositoryInAccount extends JpaRepository<TravelAccountJpaEntity, Long> {

    Optional<TravelAccountJpaEntity> findByAccountNumber(String accountNumber);

    @Query("select ta from TravelAccountJpaEntity ta join fetch ta.travel t where ta.id = :id")
    Optional<TravelAccountJpaEntity> findTravelById(@Param("id") Long id);
}
