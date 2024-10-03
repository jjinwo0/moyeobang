package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawProportionResponse;
import com.ssafy.moyeobang.account.application.port.in.GetWithdrawProportionQuery;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class GetWithdrawProportionController {

    private final GetWithdrawProportionQuery getWithdrawProportionQuery;

    @GetMapping("/api/accounts/{accountId}/withdraw-proportion")
    public ApiResult<List<GetWithdrawProportionResponse>> getWithdrawProportion(@PathVariable Long accountId) {
        return success(getWithdrawProportionQuery.getWithdrawProportion(accountId));
    }
}
