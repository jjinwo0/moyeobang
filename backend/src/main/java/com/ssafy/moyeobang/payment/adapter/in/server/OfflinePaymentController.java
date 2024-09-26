package com.ssafy.moyeobang.payment.adapter.in.server;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.OfflineStoreCommand;
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
public class OfflinePaymentController {

    private final PaymentUseCase paymentUseCase;

    @PostMapping("/confirm")
    public ApiResult<Boolean> confirmPayment(@RequestBody OfflinePaymentRequest request) {

        OfflineStoreCommand offlineStoreCommand = OfflineStoreCommand.createAndValidate(
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
                offlineStoreCommand,
                request.amount()
        );
        boolean paymentSuccess = paymentUseCase.confirmPayment(command);
        return success(paymentSuccess);
    }
}
