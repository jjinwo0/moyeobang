package com.ssafy.moyeobang.payment.adapter.in.web.request;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType;

public record OnlinePaymentRequest(String paymentRequestId,
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