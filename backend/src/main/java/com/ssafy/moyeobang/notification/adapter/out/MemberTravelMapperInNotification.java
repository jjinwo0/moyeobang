package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import org.springframework.stereotype.Component;

@Component
public class MemberTravelMapperInNotification {

    public MemberTravel mapToDomain(MemberTravelJpaEntity entity) {

        return MemberTravel.of(
                entity.getId(),
                entity.getTravel().getId(),
                entity.getMember().getId(),
                entity.getBalance()
        );
    }
}
