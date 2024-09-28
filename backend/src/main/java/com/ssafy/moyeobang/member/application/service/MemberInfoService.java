package com.ssafy.moyeobang.member.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.in.MemberInfoUseCase;
import com.ssafy.moyeobang.member.application.port.out.LoadMemberInfoPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class MemberInfoService implements MemberInfoUseCase {

    private final TokenManager tokenManager;

    private final LoadMemberInfoPort loadMemberInfoPort;

    @Override
    public MemberInfo getMemberInfo(String token) {

        Long findMemberId = tokenManager.getMemberId(token);

        return loadMemberInfoPort.loadMemberInfo(findMemberId);
    }
}
