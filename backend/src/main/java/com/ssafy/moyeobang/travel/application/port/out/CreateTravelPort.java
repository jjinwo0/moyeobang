package com.ssafy.moyeobang.travel.application.port.out;

public interface CreateTravelPort {

    Long createTravel(CreateTravelOutCommand command);
}
