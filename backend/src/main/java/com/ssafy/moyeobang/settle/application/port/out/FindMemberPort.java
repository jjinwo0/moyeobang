package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.member.Member;

public interface FindMemberPort {

    Member findMemberById(Long id);
}
