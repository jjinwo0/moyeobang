package com.ssafy.moyeobang.payment.application.domain;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = PRIVATE)
public class Store {

    private String storeId;
    private String storeName;
    private String storeAddress;
    private double latitude;
    private double longitude;
    private String storeAccountNumber;


    public static Store of(String storeId, String storeName, String storeAddress, double latitude, double longitude,
                           String storeAccountNumber) {
        return new Store(storeId, storeName, storeAddress, latitude, longitude, storeAccountNumber);
    }
}
