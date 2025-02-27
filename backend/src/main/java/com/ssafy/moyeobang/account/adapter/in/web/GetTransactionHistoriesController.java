package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoriesResponse;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoriesQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetTransactionHistoriesController {

    private final GetTransactionHistoriesQuery getTransactionHistoriesQuery;

    @GetMapping("/api/accounts/{accountId}/transactions")
    public ApiResult<List<GetTransactionHistoriesResponse>> getTransactionHistories(@PathVariable Long accountId,
                                                                                    @RequestParam Set<Long> memberIds) {
        return success(getTransactionHistoriesQuery.getTransactionHistories(accountId, memberIds));
    }
}
