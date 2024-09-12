package com.ssafy.moyeobang.notification.application.port.out;

import com.ssafy.moyeobang.notification.application.domain.Member;
import java.util.List;

public interface LoadMemberInTravelPort {

    List<Member> findMemberIdByMemberTravelEntity(Long travelId);
}
