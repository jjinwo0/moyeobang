package com.ssafy.moyeobang.travel.application.port.in;

import com.ssafy.moyeobang.travel.adapter.in.web.out.CreateTravelResponse;

public interface CreateTravelUseCase {

    CreateTravelResponse createTravel(CreateTravelInCommand command);
}
