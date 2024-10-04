package com.ssafy.moyeobang.payment.application.domain;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Store {

    private String storeId;
    private String storeName;
    private String storeAddress;
    private double latitude;
    private double longitude;
    private String storeAccountNumber;
    private WithdrawType tag;


    public static Store of(String storeId, String storeName, String storeAddress, double latitude, double longitude,
                           String storeAccountNumber, WithdrawType tag) {
        return new Store(storeId, storeName, storeAddress, latitude, longitude, storeAccountNumber, tag);
    }
}
