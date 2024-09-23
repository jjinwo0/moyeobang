package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import java.util.List;
import java.util.Map;

public interface MemberTravelRepositoryInNotificationCustom {

    Map<Long, List<MemberTravelJpaEntity>> findAllMemberInTravel();
}
