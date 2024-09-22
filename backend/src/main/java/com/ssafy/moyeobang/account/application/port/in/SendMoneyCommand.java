package com.ssafy.moyeobang.account.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.account.application.domain.Money;
import jakarta.validation.constraints.NotNull;

public record SendMoneyCommand(@NotNull Long memberId,
                               @NotNull String targetAccountNumber,
                               @NotNull Money money) {

    public SendMoneyCommand(Long memberId, String targetAccountNumber, Long amount) {
        this(memberId, targetAccountNumber, Money.of(amount));

        validate(this);
    }
}
