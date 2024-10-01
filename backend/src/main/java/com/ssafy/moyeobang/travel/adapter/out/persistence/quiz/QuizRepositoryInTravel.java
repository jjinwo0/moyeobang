package com.ssafy.moyeobang.travel.adapter.out.persistence.quiz;

import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuizRepositoryInTravel extends JpaRepository<QuizJpaEntity, Long> {

    @Modifying
    @Query("delete QuizJpaEntity q where q.travel.id = :travelId")
    int deleteBy(@Param("travelId") Long travelId);
}
