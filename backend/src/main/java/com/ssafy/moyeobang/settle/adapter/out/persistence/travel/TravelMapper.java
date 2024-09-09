package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.settle.application.domain.travel.Travel;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TravelMapper {

    Travel mapToDomain(TravelEntity travelEntity) {

        Map<Long, Integer> memberBalance = travelEntity.getMemberTravelEntities().stream()
                .collect(
                        Collectors.toMap(
                                t -> t.getMemberEntity().getId(),
                                t -> t.getBalance()
                        )
                );

        return Travel.of(
                travelEntity.getId(),
                travelEntity.getTitle(),
                memberBalance
        );
    }

    TravelEntity mapToEntity(Travel travel) {

        return TravelEntity.builder()
                .id(travel.getId())
                .title(travel.getTitle())
                .build();
    }
}
