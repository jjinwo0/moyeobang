package com.ssafy.moyeobang.member.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.member.application.domain.AccessTokenInfo;
import com.ssafy.moyeobang.member.application.port.in.TokenUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class TokenController {

    private final TokenUseCase tokenUseCase;

    @PostMapping("/api/reissue/token")
    public ApiResult<AccessTokenInfo> createAccessToken(@RequestHeader("Authorization") String refreshToken) {

        return success(tokenUseCase.createAccessToken(refreshToken));
    }
}
