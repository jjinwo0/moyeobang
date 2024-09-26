package com.ssafy.moyeobang.payment.adapter.in.web;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.OnlineStoreCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class OnlinePaymentController {

    private final PaymentUseCase paymentUseCase;

    @PostMapping("/process")
    public ApiResult<Boolean> processPayment(@RequestBody OfflinePaymentRequest request) {

        OnlineStoreCommand onlineStoreCommand = OnlineStoreCommand.of(
                request.placeId(),
                request.placeName(),
                request.placeAddress(),
                request.latitude(),
                request.longitude(),
                request.targetAccountNumber()
        );

        PaymentCommand command = new PaymentCommand(
                request.paymentRequestId(),
                request.sourceAccountNumber(),
                onlineStoreCommand,
                request.amount()
        );
        boolean paymentSuccess = paymentUseCase.processPayment(command);
        return success(paymentSuccess);
    }
}
