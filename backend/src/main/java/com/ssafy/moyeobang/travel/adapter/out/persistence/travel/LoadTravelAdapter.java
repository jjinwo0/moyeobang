package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.travel.application.domain.Travel;
import com.ssafy.moyeobang.travel.application.port.out.LoadTravelPort;
import com.ssafy.moyeobang.travel.error.TravelNotFoundException;
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

    @Override
    public Travel loadTravel(Long travelId) {
        TravelInfo travelInfo = travelRepository.findTravelInfoBy(travelId)
                .orElseThrow(TravelNotFoundException::new);

        return travelMapper.mapToTravel(travelInfo);
    }
}
