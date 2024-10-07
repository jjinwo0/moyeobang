package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.notification.application.domain.TravelAccount;
import org.springframework.stereotype.Component;

@Component
public class TravelAccountMapperInNotification {

    TravelAccount mapToDomain(TravelAccountJpaEntity entity) {

        return TravelAccount.of(entity.getId(), entity.getAccountNumber());
    }
}
