package com.ssafy.moyeobang.payment.application.port.in;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawType;
import com.ssafy.moyeobang.payment.application.domain.Store;

public record OnlineStoreCommand(
        String placeId,
        String placeName,
        String placeAddress,
        Double latitude,
        Double longitude,
        String targetAccountNumber, WithdrawType tag) implements StoreCommand {

    public static OnlineStoreCommand of(String placeId, String placeName, String placeAddress, Double latitude,
                                        Double longitude, String targetAccountNumber, WithdrawType tag) {
        return new OnlineStoreCommand(placeId, placeName, placeAddress, latitude, longitude, targetAccountNumber, tag);
    }

    public Store toDomain() {
        return Store.of(placeId, placeName, placeAddress, latitude, longitude, targetAccountNumber, tag);
    }
}
