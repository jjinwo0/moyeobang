package com.ssafy.moyeobang.travel.application.port.in;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record CreateTravelCommand(@NotNull String title,
                                  @NotNull LocalDateTime startDate,
                                  @NotNull LocalDateTime endDate) {
}
