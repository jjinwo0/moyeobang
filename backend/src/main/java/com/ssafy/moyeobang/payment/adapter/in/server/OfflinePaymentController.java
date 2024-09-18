package com.ssafy.moyeobang.payment.adapter.in.server;

import static com.ssafy.moyeobang.common.util.ApiUtils.error;
import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
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

    @PostMapping("/confirm")
    public ApiResult<?> confirmPayment(@RequestBody OfflinePaymentRequest request) {
        boolean paymentSuccess = offlinePaymentUseCase.confirmPayment(request);
        if (paymentSuccess) {
            return success("Success");
        }
        return error("Fail", HttpStatus.BAD_REQUEST);
    }
}
