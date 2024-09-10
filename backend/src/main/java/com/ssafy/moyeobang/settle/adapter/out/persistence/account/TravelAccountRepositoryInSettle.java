package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TravelAccountRepositoryInSettle extends JpaRepository<TravelAccountJpaEntity, Long> {

    @Query("SELECT t FROM TravelAccountJpaEntity t JOIN FETCH t.travel WHERE t.id = :id")
    Optional<TravelAccountJpaEntity> findByIdWithTravel(@Param("id") Long id);
}
