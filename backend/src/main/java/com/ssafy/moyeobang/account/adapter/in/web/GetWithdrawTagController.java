package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawTagResponse;
import com.ssafy.moyeobang.account.application.port.in.GetWithdrawTagQuery;
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
public class GetWithdrawTagController {

    private final GetWithdrawTagQuery getWithdrawTagQuery;

    @GetMapping("/api/accounts/{accountId}/tags")
    public ApiResult<List<GetWithdrawTagResponse>> getWithdrawTag(@PathVariable Long accountId,
                                                                  @RequestParam Set<Long> memberIds) {
        return success(getWithdrawTagQuery.getWithdrawTag(accountId, memberIds));
    }
}
