package com.ssafy.moyeobang.payment.adapter.in.server;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.adapter.in.web.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class OfflinePaymentController {

    private final OfflinePaymentUseCase offlinePaymentUseCase;

    // TODO: ApiResult 로 변경 필요
    @PostMapping("/confirm")
    public ApiResult<?> confirmPayment(@RequestBody OfflinePaymentRequest request) {
        boolean paymentSuccess = offlinePaymentUseCase.confirmPayment(request);

        if (paymentSuccess) {
            return ApiUtils.success("Payment successful");
        }
        return ApiUtils.error("Payment failed", HttpStatus.BAD_REQUEST);
    }
}
