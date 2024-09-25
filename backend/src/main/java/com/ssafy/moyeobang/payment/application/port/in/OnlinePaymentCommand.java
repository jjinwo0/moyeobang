package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record OnlinePaymentCommand(@NotNull String paymentRequestId, @NotNull String travelAccountNumber,
                                   @NotNull StoreCommand storeCommand,
                                   @NotNull Money paymentRequestMoney) {

    public OnlinePaymentCommand(String paymentRequestId, String travelAccountNumber, StoreCommand storeCommand,
                                Long amount) {
        this(paymentRequestId, travelAccountNumber, storeCommand, Money.of(amount));

        validate(this);
    }

    public Store toStoreDomain() {
        return storeCommand.toDomain();
    }
}
