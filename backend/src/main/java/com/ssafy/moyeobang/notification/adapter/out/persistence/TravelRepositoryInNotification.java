package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelRepositoryInNotification extends JpaRepository<TravelJpaEntity, Long> {
}
