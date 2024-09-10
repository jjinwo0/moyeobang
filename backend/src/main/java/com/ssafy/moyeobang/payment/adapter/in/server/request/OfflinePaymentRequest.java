package com.ssafy.moyeobang.payment.adapter.in.server.request;

public record OfflinePaymentRequest(String accountNumber, String paymentSessionId, Integer amount, String paymentLocation, ) {
}
