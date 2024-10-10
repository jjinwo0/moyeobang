package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.application.domain.Travel;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class TravelMapperInAccount {

    public Travel mapToDomain(final TravelJpaEntity entity) {

        return Travel.of(
                entity.getId(),
                entity.getEndDate()
        );
    }
}
