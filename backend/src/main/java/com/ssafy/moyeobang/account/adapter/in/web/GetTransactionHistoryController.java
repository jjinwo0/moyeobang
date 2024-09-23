package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoryResponse;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoryQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetTransactionHistoryController {

    private final GetTransactionHistoryQuery getTransactionHistoryQuery;

    @GetMapping("/api/accounts/{accountId}/transactions/{transactionId}")
    public ApiResult<GetTransactionHistoryResponse> getTransactionHistories(@PathVariable Long accountId,
                                                                            @PathVariable Long transactionId) {
        return success(getTransactionHistoryQuery.getTransactionHistory(accountId, transactionId));
    }
}
