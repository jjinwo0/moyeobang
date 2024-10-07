package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelAccountRepositoryInNotification extends JpaRepository<TravelAccountJpaEntity, Long> {
}
