package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.travel.Travel;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class TravelMapper {

    Travel mapToDomain(TravelJpaEntity travelEntity) {

        Map<Long, Long> memberBalance = travelEntity.getMemberTravelJpaEntities().stream()
                .collect(
                        Collectors.toMap(
                                t -> t.getMember().getId(),
                                t -> t.getBalance()
                        )
                );

        return Travel.of(
                travelEntity.getId(),
                travelEntity.getTitle(),
                memberBalance
        );
    }

    TravelJpaEntity mapToEntity(Travel travel) {

        return TravelJpaEntity.builder()
                .title(travel.getTitle())
                .build();
    }
}
