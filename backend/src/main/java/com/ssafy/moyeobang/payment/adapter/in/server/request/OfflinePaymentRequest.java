package com.ssafy.moyeobang.payment.adapter.in.server.request;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType;

public record OfflinePaymentRequest(
        String paymentRequestId,
        String placeId,
        String placeName,
        String placeAddress,
        double latitude,
        double longitude,
        long amount,
        WithdrawType tag,
        String sourceAccountNumber,
        String targetAccountNumber) {
}

