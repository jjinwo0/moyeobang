package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import java.util.List;

public interface TravelQueryRepository {

    List<TravelInfo> findTravelInfosBy(Long memberId);
}
