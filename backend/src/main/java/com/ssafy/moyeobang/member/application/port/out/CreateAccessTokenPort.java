package com.ssafy.moyeobang.member.application.port.out;

import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;

public interface CreateAccessTokenPort {

    AccessTokenInfo createAccessToken(String token);
}
