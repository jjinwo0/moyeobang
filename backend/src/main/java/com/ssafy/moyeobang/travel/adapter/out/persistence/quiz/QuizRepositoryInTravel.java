package com.ssafy.moyeobang.travel.adapter.out.persistence.quiz;

import com.ssafy.moyeobang.common.persistenceentity.travel.QuizJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepositoryInTravel extends JpaRepository<QuizJpaEntity, Long> {
}
