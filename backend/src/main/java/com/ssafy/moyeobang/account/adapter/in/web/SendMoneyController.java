package com.ssafy.moyeobang.account.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.account.adapter.in.web.request.SendMoneyRequest;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyUseCase;
import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequiredArgsConstructor
public class SendMoneyController {

    private final SendMoneyUseCase sendMoneyUseCase;

    @PostMapping("/api/accounts/{accountId}/send")
    public ApiResult<Boolean> sendMoney(@PathVariable Long accountId,
                                        @RequestBody SendMoneyRequest sendMoneyRequest) {
        SendMoneyCommand command = new SendMoneyCommand(
                sendMoneyRequest.memberId(),
                accountId,
                sendMoneyRequest.amount()
        );

        sendMoneyUseCase.sendMoney(command);

        return success(true);
    }
}
