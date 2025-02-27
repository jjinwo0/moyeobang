package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType;
import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record PaymentCommand(@NotNull String paymentRequestId, @NotNull String travelAccountNumber,
                             @NotNull StoreCommand storeCommand,
                             @NotNull Money paymentRequestMoney, WithdrawType tag) {

    public PaymentCommand(String paymentRequestId, String travelAccountNumber,
                          StoreCommand storeCommand,
                          Long amount, WithdrawType tag) {
        this(paymentRequestId, travelAccountNumber, storeCommand, Money.of(amount), tag);

        validate(this);
    }

    public Store toStoreDomain() {
        return storeCommand.toDomain();
    }
}
