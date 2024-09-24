package com.ssafy.moyeobang.settle.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.settle.adapter.in.web.request.CustomSettleRequest;
import com.ssafy.moyeobang.settle.adapter.in.web.request.SettleRequest;
import com.ssafy.moyeobang.settle.application.port.in.CustomSettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleCommand;
import com.ssafy.moyeobang.settle.application.port.in.SettleUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/travel/accounts/transactions")
@RequiredArgsConstructor
public class SettleController {

    private final SettleUseCase settleUseCase;

    @PostMapping("/{transactionId}/settle")
    public ApiResult<Boolean> settle(@PathVariable("transactionId") Long transactionId,
                                     @RequestBody SettleRequest request) {

        // todo: 리턴값 고정하고 값이 없을 때 errorResponse를 할 것인가?
        return success(request.details().stream()
                .allMatch(item -> settleUseCase.balanceSettle(
                        new SettleCommand(
                                transactionId,
                                item.orderItemTitle(),
                                item.orderItemPrice(),
                                item.participants()
                        ))
                )
        );
    }

    @PostMapping("/{transactionId}/settle/custom")
    public ApiResult<Boolean> customSettle(@PathVariable("transactionId") Long transactionId,
                                           @RequestBody CustomSettleRequest request) {

        return success(request.info().stream()
                .allMatch(info -> settleUseCase.customBalanceSettle(
                        new CustomSettleCommand(
                                transactionId,
                                request.paymentName(),
                                info.money(),
                                info.memberId()
                        )
                ))
        );
    }
}
