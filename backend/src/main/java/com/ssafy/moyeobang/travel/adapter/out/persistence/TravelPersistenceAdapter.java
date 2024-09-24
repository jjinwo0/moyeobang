package com.ssafy.moyeobang.travel.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TravelPersistenceAdapter implements CreateTravelPort {

    private final TravelRepositoryInTravel travelRepository;

    @Override
    public Long createTravel(CreateTravelCommand command) {
        TravelJpaEntity travel = createTravelJpaEntity(command);
        travelRepository.save(travel);

        return travel.getId();
    }

    private TravelJpaEntity createTravelJpaEntity(CreateTravelCommand command) {
        return TravelJpaEntity.builder()
                .title(command.title())
                .startDate(command.startDate())
                .endDate(command.endDate())
                .build();
    }
}
