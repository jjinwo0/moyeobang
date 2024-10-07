package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Member;

public interface LoadMemberPort {

    Member loadMember(Long memberId);
}
