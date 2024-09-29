package com.ssafy.moyeobang.settle.application.port.in;

import jakarta.validation.constraints.NotNull;

public record CustomSettleCommand(@NotNull Long transactionId,
                                  @NotNull Long travelId,
                                  @NotNull String title,
                                  @NotNull Integer money,
                                  @NotNull Long memberId) {
}
