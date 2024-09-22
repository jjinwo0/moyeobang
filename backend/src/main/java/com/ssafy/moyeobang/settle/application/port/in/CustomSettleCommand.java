package com.ssafy.moyeobang.settle.application.port.in;

import jakarta.validation.constraints.NotNull;

public record CustomSettleCommand(@NotNull Long transactionId,
                                  @NotNull String title,
                                  @NotNull Integer amount,
                                  @NotNull Long memberId) {
}
