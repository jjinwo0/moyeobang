package com.ssafy.moyeobang.settle.application.port.in;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.List;

public record SettleCommand(@NotNull Long transactionId,
                            @NotNull String title,
                            @Positive Integer amount,
                            @NotNull @Size(min = 1) List<Long> participants) {
}
