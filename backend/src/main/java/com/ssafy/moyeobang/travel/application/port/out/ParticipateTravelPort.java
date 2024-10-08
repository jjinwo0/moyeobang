package com.ssafy.moyeobang.travel.application.port.out;

public interface ParticipateTravelPort {

    boolean participateTravel(Long travelId, Long memberId);
}
