package com.ssafy.moyeobang.verify.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.verify.adapter.in.web.request.CheckRequest;
import com.ssafy.moyeobang.verify.adapter.in.web.request.VerifyRequest;
import com.ssafy.moyeobang.verify.application.port.in.VerifyAccountUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

@WebAdapter
@RequiredArgsConstructor
public class VerifyAccountController {

    private final VerifyAccountUseCase verifyAccountUseCase;

    /**
     * 1원 송금 API
     * @param token
     * @param info
     * @return
     */
    @PostMapping("/api/auth/account/verify/initiate")
    public ApiResult<?> verifyAccount(@RequestHeader("Authorization")String token,
                                      @RequestBody VerifyRequest request) {

        // todo: bankName 활용 과정이 없음
        return success(
                verifyAccountUseCase.verifyAccount(
                        token,
                        request.accountNumber(),
                        request.bankName()
        ));
    }

    @PostMapping("/api/auth/account/verify/confirm")
    public ApiResult<?> checkAuthCode(@RequestHeader("Authorization")String token,
                                      @RequestBody CheckRequest request) {

        return success(
                verifyAccountUseCase.checkVerifyAccount(
                        token,
                        request.accountNumber(),
                        request.authCode()
                )
        );
    }
}
