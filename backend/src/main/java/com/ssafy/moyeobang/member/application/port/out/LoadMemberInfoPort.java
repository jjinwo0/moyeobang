package com.ssafy.moyeobang.member.application.port.out;

import com.ssafy.moyeobang.member.application.domain.MemberInfo;

public interface LoadMemberInfoPort {

    MemberInfo loadMemberInfo(Long id);
}
