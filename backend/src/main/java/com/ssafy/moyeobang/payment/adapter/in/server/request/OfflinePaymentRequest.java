package com.ssafy.moyeobang.payment.adapter.in.server.request;

import java.util.List;

public record OfflinePaymentRequest(
        String paymentRequestId,
        String placeId,
        String placeName,
        String placeAddress,
        Float latitude,
        Float longitude,
        Integer amount,
        String targetAccountNumber,
        List<OrderItem> orderItems) {
}
