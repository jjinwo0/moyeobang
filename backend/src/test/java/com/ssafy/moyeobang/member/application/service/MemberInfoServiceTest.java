package com.ssafy.moyeobang.member.application.service;

import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.out.CreateMemberAccountPort;
import com.ssafy.moyeobang.member.application.port.out.LoadMemberInfoPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MemberInfoServiceTest {

    @Mock
    private TokenManager tokenManager;

    @Mock
    private LoadMemberInfoPort loadMemberInfoPort;

    @Mock
    private CreateMemberAccountPort createMemberAccountPort;

    @InjectMocks
    private MemberInfoService memberInfoService;

    @Test
    @DisplayName("회원 프로필 조회 로직 검증")
    void 프로필_조회() {

        String token = "Bearer accessToken";
        Long memberId = 1L;

        MemberInfo expected = MemberInfo.of(
                memberId,
                "testMember",
                null,
                100L,
                "싸피뱅크",
                "123-456-7890"
        );

        when(tokenManager.getMemberId(token)).thenReturn(memberId);
        when(loadMemberInfoPort.loadMemberInfo(memberId)).thenReturn(expected);

        MemberInfo actualMemberInfo = memberInfoService.getMemberInfo(token);

        assertEquals(expected, actualMemberInfo);
    }

    @Test
    @DisplayName("타인의 프로필 조회")
    void 타인_프로필_조회() {

        Long id = 10L;

        MemberInfo expected = MemberInfo.of(
                id,
                "other",
                null,
                200L,
                "싸피뱅크",
                "234-567-8901"
        );

        when(loadMemberInfoPort.loadMemberInfo(id)).thenReturn(expected);

        MemberInfo actual = memberInfoService.getMemberInfoOthers(10L);

        assertEquals(expected, actual);
    }
}