package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountMemberBalanceResponse;
import com.ssafy.moyeobang.account.application.port.in.GetAccountMemberBalanceQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetAccountMemberController {

    private final GetAccountMemberBalanceQuery getAccountMemberBalanceQuery;

    @GetMapping("/api/accounts/{accountId}/balance/member/{memberId}")
    public ApiResult<GetAccountMemberBalanceResponse> getAccountMemberBalance(@PathVariable Long accountId,
                                                                              @PathVariable Long memberId) {
        return success(getAccountMemberBalanceQuery.getAccountMemberBalance(accountId, memberId));
    }
}
