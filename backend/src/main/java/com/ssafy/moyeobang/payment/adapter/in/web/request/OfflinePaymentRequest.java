package com.ssafy.moyeobang.payment.adapter.in.web.request;

public record OfflinePaymentRequest(String accountNumber, String paymentSessionId, Integer amount) {
}
