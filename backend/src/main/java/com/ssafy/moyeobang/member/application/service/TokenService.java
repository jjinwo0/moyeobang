package com.ssafy.moyeobang.member.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;
import com.ssafy.moyeobang.member.application.port.in.TokenUseCase;
import com.ssafy.moyeobang.member.application.port.out.CreateAccessTokenPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@UseCase
@RequiredArgsConstructor
public class TokenService implements TokenUseCase {

    private final CreateAccessTokenPort createAccessTokenPort;

    @Override
    public AccessTokenInfo createAccessToken(String token) {

        return createAccessTokenPort.createAccessToken(token);
    }
}
