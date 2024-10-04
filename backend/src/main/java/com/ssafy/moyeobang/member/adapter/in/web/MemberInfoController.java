package com.ssafy.moyeobang.member.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.in.MemberInfoUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberInfoController {

    private final MemberInfoUseCase memberInfoUseCase;

    /**
     * 내 프로필 조회
     *
     * @param authorization
     * @return
     */
    @GetMapping("/user/me/profile")
    public ApiResult<?> getMemberInfo(@RequestHeader String authorization) {

        MemberInfo findMemberProfile = memberInfoUseCase.getMemberInfo(authorization);

        return success(findMemberProfile);
    }

    @GetMapping("/user/{userId}/profile")
    public ApiResult<?> getMemberInfoOthers(@PathVariable("userId") Long id) {

        MemberInfo findMemberInfo = memberInfoUseCase.getMemberInfoOthers(id);

        return success(findMemberInfo);
    }

    @PostMapping("/register/account/{memberId}")
    public ApiResult<?> registerAccount(@PathVariable("memberId") Long memberId,
                                        @RequestParam("accountNo") String accountNo) {

        return success(memberInfoUseCase.createMemberAccount(accountNo, memberId));
    }
}
