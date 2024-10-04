package com.ssafy.moyeobang.payment.adapter.in.web.request;

public record OnlinePaymentRequest(String paymentRequestId,
                                   String placeId,
                                   String placeName,
                                   String placeAddress,
                                   double latitude,
                                   double longitude,
                                   long amount,
                                   String tag,
                                   String sourceAccountNumber,
                                   String targetAccountNumber) {
}