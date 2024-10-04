package com.ssafy.van.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaymentRequest {
    private String paymentRequestId;
    private String placeId;
    private String placeName;
    private String placeAddress;
    private double latitude;
    private double longitude;
    private long amount;
    private String sourceAccountNumber;
    private String targetAccountNumber;
    private String tag;
}
