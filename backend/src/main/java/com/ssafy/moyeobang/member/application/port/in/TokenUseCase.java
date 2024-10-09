package com.ssafy.moyeobang.member.application.port.in;

import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;

public interface TokenUseCase {

    AccessTokenInfo createAccessToken(String token);
}
