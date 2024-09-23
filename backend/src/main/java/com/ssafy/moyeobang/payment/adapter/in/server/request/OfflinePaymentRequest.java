package com.ssafy.moyeobang.payment.adapter.in.server.request;

public record OfflinePaymentRequest(
        String paymentRequestId,
        String placeId,
        String placeName,
        String placeAddress,
        double latitude,
        double longitude,
        long amount,
        String sourceAccountNumber,
        String targetAccountNumber) {
}

