package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import java.util.List;

public interface MemberQueryRepository {

    List<MemberInfo> findMembersBy(Long travelId);
}
