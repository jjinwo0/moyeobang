package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record PaymentCommand(@NotNull String paymentRequestId, @NotNull String travelAccountNumber,
                             @NotNull StoreCommand storeCommand,
                             @NotNull Money paymentRequestMoney, String tag) {

    public PaymentCommand(String paymentRequestId, String travelAccountNumber,
                          StoreCommand storeCommand,
                          Long amount, String tag) {
        this(paymentRequestId, travelAccountNumber, storeCommand, Money.of(amount), tag);

        validate(this);
    }

    public Store toStoreDomain() {
        return storeCommand.toDomain();
    }
}
