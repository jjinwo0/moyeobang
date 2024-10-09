package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.request.SendMoneyRequest;
import com.ssafy.moyeobang.account.application.port.in.RefundMoneyUseCase;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class RefundMoneyController {

    private final RefundMoneyUseCase refundMoneyUseCase;

    @PostMapping("/api/accounts/{accountId}/refund")
    public ApiResult<Boolean> sendMoney(@PathVariable Long accountId) {
        refundMoneyUseCase.refundMoney(accountId);

        return success(true);
    }
}
