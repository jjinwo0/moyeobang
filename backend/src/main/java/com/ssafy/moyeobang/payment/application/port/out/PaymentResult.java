package com.ssafy.moyeobang.payment.application.port.out;

import java.time.LocalDateTime;

public record PaymentResult(long withdrawId, long amount, String placeAddress, String placeName,
                            LocalDateTime createTime) {
}
