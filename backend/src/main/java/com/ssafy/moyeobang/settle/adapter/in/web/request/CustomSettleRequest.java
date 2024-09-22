package com.ssafy.moyeobang.settle.adapter.in.web.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CustomSettleRequest(@NotNull String paymentName,
                                  @NotNull int money,
                                  @NotNull @Size(min = 1) List<CustomSettleInfo> info,
                                  String splitMethod) {
}
