package com.ssafy.moyeobang.payment.application.port.out;

import java.time.LocalDateTime;

public record PaymentResult(long transactionId, long money, String address, String paymentName,
                            LocalDateTime createAt) {
}
