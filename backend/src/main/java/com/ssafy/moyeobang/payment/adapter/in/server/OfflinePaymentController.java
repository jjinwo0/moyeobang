package com.ssafy.moyeobang.payment.adapter.in.server;

import static com.ssafy.moyeobang.common.util.ApiUtils.success;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.OrderItem;
import com.ssafy.moyeobang.payment.application.domain.OrderItems;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import java.util.List;
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

    private final OfflinePaymentUseCase offlinePaymentUseCase;

    @PostMapping("/confirm")
    public ApiResult<Boolean> confirmPayment(@RequestBody OfflinePaymentRequest request) {

        Store store = Store.of(
                request.placeId(),
                request.placeName(),
                request.placeAddress(),
                request.latitude(),
                request.longitude(),
                request.targetAccountNumber()
        );

        List<OrderItem> orderItems = request.orderItems().stream()
                .map(req -> new OrderItem(req.title(), Money.of(req.amount())))
                .toList();

        PaymentCommand command = new PaymentCommand(
                request.paymentRequestId(),
                request.sourceAccountNumber(),
                store,
                request.amount(),
                new OrderItems(orderItems)
        );
        boolean paymentSuccess = offlinePaymentUseCase.confirmPayment(command);
        return success(paymentSuccess);
    }
}
