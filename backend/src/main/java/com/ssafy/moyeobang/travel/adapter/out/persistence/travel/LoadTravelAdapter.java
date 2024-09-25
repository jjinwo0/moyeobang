package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadTravelAdapter implements LoadTravelPort {

    private final TravelRepositoryInTravel travelRepository;
    private final TravelMapper travelMapper;

    @Override
    public List<Travel> loadTravelsBy(Long memberId) {
        List<TravelInfo> travelInfos = travelRepository.findTravelInfosBy(memberId);

        return travelInfos.stream()
                .map(travelMapper::mapToTravel)
                .toList();
    }
}
