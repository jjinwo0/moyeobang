package com.ssafy.moyeobang.payment.adapter.in.server.request;

import java.util.List;

public record OfflinePaymentRequest(
        String paymentRequestId,
        String placeId,
        String placeName,
        String placeAddress,
        Double latitude,
        Double longitude,
        long amount,
        String sourceAccountNumber,
        String targetAccountNumber,
        List<OrderItemRequest> orderItems) {
}
