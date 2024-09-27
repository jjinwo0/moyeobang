package com.ssafy.moyeobang.member.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.in.MemberInfoUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberInfoController {

    private final MemberInfoUseCase memberInfoUseCase;

    @GetMapping("/user/me/profile")
    public ApiResult<?> getMemberInfo(@RequestHeader String authorization) {

        MemberInfo findMemberProfile = memberInfoUseCase.getMemberInfo(authorization);

        return success(findMemberProfile);
    }
}
