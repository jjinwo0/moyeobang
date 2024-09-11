package com.ssafy.moyeobang.payment.adapter.in.server.request;

import java.util.List;

public record OfflinePaymentRequest(
        String title,
        Integer amount,
        String senderAccountNumber,
        String receiverAccountNumber,
        Float latitude,
        Float longitude,
        String paymentSessionId,
        List<OrderRequest> orders) {
}
