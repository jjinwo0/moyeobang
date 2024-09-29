package com.ssafy.moyeobang.travel.application.port.out;

public interface LeaveTravelPort {

    boolean leaveTravel(Long travelId, Long memberId);
}
