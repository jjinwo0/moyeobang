package com.ssafy.moyeobang.travel.application.port.out;

public interface CreateTravelEventPublishPort {

    void publish(Long travelId);
}
