package com.ssafy.moyeobang.member.application.port.out;

public interface CreateMemberAccountPort {

    Long createMemberAccount(String accountNo, Long memberId);
}
