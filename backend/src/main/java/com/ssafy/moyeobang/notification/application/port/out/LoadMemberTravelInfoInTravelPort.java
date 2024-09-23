package com.ssafy.moyeobang.notification.application.port.out;

import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import java.util.List;
import java.util.Map;

public interface LoadMemberTravelInfoInTravelPort {

    List<Member> findMemberIdByMemberTravelEntity(Long travelId);

    Map<Long, List<MemberTravel>> findAllMemberInTravel();
}
