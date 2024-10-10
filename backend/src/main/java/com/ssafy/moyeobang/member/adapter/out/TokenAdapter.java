package com.ssafy.moyeobang.member.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.common.config.jwt.constant.TokenType;
import com.ssafy.moyeobang.common.config.jwt.dto.TokenDetail;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.member.adapter.out.persistence.MemberRepositoryInMemberInfo;
import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;
import com.ssafy.moyeobang.member.application.port.out.CreateAccessTokenPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import java.time.Duration;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TokenAdapter implements CreateAccessTokenPort {

    private final TokenManager tokenManager;

    private final MemberRepositoryInMemberInfo memberRepository;

    private final TokenMapper tokenMapper;

    @Override
    public AccessTokenInfo createAccessToken(String token) {

        tokenManager.validToken(token);

        Long findMemberId = tokenManager.getMemberId(token);

        MemberJpaEntity findMember = memberRepository.findById(findMemberId)
                .orElseThrow(() -> new EntityNotFoundException("[" + findMemberId + "] 해당하는 회원 정보가 없습니다."));

        TokenDetail createAccessToken = tokenManager.generateToken(findMember, Duration.ofHours(24),
                TokenType.ACCESS);

        return tokenMapper.mapToDomain(createAccessToken);
    }
}
