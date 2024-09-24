package com.ssafy.moyeobang.travel.application.port.out;

import com.ssafy.moyeobang.travel.application.port.in.CreateTravelCommand;

public interface CreateTravelPort {

    Long createTravel(CreateTravelCommand command);
}
