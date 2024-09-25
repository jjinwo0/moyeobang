package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TravelPlaceRepositoryInTravel extends JpaRepository<TravelPlaceJpaEntity, Long> {

    @Modifying
    @Query("delete TravelPlaceJpaEntity t where t.travel.id = :travelId")
    void deleteAllBy(@Param("travelId") Long travelId);
}
