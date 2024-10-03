package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.notification.application.domain.Travel;
import org.springframework.stereotype.Component;

@Component
public class TravelMapperInNotification {

    public Travel mapToDomain(TravelJpaEntity entity) {

        return Travel.of(entity.getId(), entity.getTitle(), entity.getTravelKey());
    }
}
