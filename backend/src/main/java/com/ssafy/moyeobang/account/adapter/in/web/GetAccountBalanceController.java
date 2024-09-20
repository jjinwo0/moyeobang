package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;
import com.ssafy.moyeobang.account.application.port.in.GetAccountBalanceQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetAccountBalanceController {

    private final GetAccountBalanceQuery getAccountBalanceQuery;

    @GetMapping("/api/accounts/{accountId}/balance")
    public ApiResult<GetAccountBalanceResponse> getAccountBalance(@PathVariable Long accountId) {
        return success(getAccountBalanceQuery.getAccountBalance(accountId));
    }
}
