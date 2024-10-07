package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import java.util.List;
import java.util.Optional;

public interface TravelQueryRepository {

    List<TravelInfo> findTravelInfosBy(Long memberId);

    Optional<TravelInfo> findTravelInfoBy(Long id);
}
