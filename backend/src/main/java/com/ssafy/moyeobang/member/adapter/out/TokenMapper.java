package com.ssafy.moyeobang.member.adapter.out;

import com.ssafy.moyeobang.common.config.jwt.dto.TokenDetail;
import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;
import com.ssafy.moyeobang.member.application.domain.GrantType;
import org.springframework.stereotype.Component;

@Component
public class TokenMapper {

    AccessTokenInfo mapToDomain(TokenDetail tokenDetail) {

        return AccessTokenInfo.of(
                GrantType.BEARER,
                tokenDetail.token(),
                tokenDetail.expireTime()
        );
    }
}
