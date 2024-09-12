package com.ssafy.moyeobang.settle.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.settle.adapter.in.web.request.SettleRequest;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moyeobang.common.util.ApiUtils.error;
import static com.ssafy.moyeobang.common.util.ApiUtils.success;

@WebAdapter
@RestController
@RequestMapping("/api/travel/accounts")
@RequiredArgsConstructor
public class SettleController {

    private final SettleUseCase settleUseCase;

    @PostMapping("/{accountId}/transactions/{transactionId}/settle")
    public ApiResult<Boolean> settle(@PathVariable("accountId") Long accountId,
                               @PathVariable("transactionId") Long transactionId,
                               @RequestBody SettleRequest request) {

        // todo: 리턴값 고정하고 값이 없을 때 errorResponse를 할 것인가?
        return success(request.orderItems().stream()
                .allMatch(item -> settleUseCase.balanceSettle(
                        new SettleCommand(
                                accountId,
                                transactionId,
                                item.title(),
                                item.amount(),
                                item.participants()
                        ))
                )
        );
    }
}
