package com.ssafy.moyeobang.travel.application.port.out;

import com.ssafy.moyeobang.travel.application.domain.Travel;
import java.util.List;

public interface LoadTravelPort {

    List<Travel> loadTravelsBy(Long memberId);

    Travel loadTravel(Long travelId);
}
