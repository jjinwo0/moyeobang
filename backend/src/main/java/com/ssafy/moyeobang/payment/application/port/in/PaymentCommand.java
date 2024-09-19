package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.OrderItems;
import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record PaymentCommand(@NotNull String paymentRequestId, @NotNull String travelAccountNumber,
                             @NotNull Store store,
                             @NotNull Money paymentRequestMoney, @NotNull OrderItems orderItems) {

    public PaymentCommand(String paymentRequestId, String travelAccountNumber, Store store, Long amount,
                          OrderItems orderItems) {
        this(paymentRequestId, travelAccountNumber, store, Money.of(amount), orderItems);

        validate(this);
    }
}
