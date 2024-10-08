package com.ssafy.moyeobang.member.application.domain;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AccessTokenInfo {

    private GrantType grantType;

    private String accessToken;

    private LocalDateTime accessTokenExpireTime;

    public static AccessTokenInfo of(GrantType type, String accessToken, LocalDateTime accessTokenExpireTime) {

        return new AccessTokenInfo(type, accessToken, accessTokenExpireTime);
    }
}
