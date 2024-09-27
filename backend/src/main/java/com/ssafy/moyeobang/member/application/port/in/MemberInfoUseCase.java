package com.ssafy.moyeobang.member.application.port.in;

import com.ssafy.moyeobang.member.application.domain.MemberInfo;

public interface MemberInfoUseCase {

    MemberInfo getMemberInfo(String token);
}
