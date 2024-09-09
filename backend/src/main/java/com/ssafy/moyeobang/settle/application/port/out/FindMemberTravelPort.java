package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;

public interface FindMemberTravelPort {

    MemberTravel findMemberTravel(Long memberId, Long travelId);
}
