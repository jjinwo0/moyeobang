package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class CreateAccountController {

    private final CreateAccountUseCase createAccountUseCase;

    @PostMapping("/api/accounts")
    public ApiResult<CreateAccountResponse> createAccount(@RequestBody CreateAccountRequest request) {
        return success(createAccountUseCase.createAccount(request.userId()));
    }
}
