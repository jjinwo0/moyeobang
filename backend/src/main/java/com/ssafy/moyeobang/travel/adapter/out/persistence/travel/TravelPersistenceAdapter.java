package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelPlaceJpaEntity;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TravelPersistenceAdapter implements CreateTravelPort {

    private final TravelRepositoryInTravel travelRepository;
    private final TravelPlaceRepositoryInTravel travelPlaceRepository;

    @Override
    public Long createTravel(CreateTravelOutCommand command) {
        TravelJpaEntity travel = createTravelJpaEntity(command);
        travelRepository.save(travel);

        List<TravelPlaceJpaEntity> travelPlaces = createTravelPlaces(travel, command);
        travelPlaceRepository.saveAll(travelPlaces);

        return travel.getId();
    }

    private TravelJpaEntity createTravelJpaEntity(CreateTravelOutCommand command) {
        return TravelJpaEntity.builder()
                .title(command.title())
                .startDate(command.startDate())
                .endDate(command.endDate())
                .backgroundImageUrl(command.backgroundImageUrl())
                .build();
    }

    private List<TravelPlaceJpaEntity> createTravelPlaces(TravelJpaEntity travel, CreateTravelOutCommand command) {
        return command.travelPlaces().stream()
                .map(place -> createTravelPlaceJpaEntity(travel, place))
                .toList();
    }

    private TravelPlaceJpaEntity createTravelPlaceJpaEntity(TravelJpaEntity travel, String name) {
        return TravelPlaceJpaEntity.builder()
                .travel(travel)
                .name(name)
                .build();
    }
}
