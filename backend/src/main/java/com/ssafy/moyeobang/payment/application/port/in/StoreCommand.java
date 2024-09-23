package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record StoreCommand(
        @NotNull String placeId,
        @NotNull String placeName,
        @NotNull String placeAddress,
        @NotNull Double latitude,
        @NotNull Double longitude,
        @NotNull String targetAccountNumber) {

    public static StoreCommand createAndValidate(String placeId, String placeName, String placeAddress, Double latitude,
                                                 Double longitude, String targetAccountNumber) {
        StoreCommand storeCommand = new StoreCommand(placeId, placeName, placeAddress, latitude, longitude,
                targetAccountNumber);
        validate(storeCommand);
        return storeCommand;
    }


    public Store toDomain() {
        return Store.of(placeId, placeName, placeAddress, latitude, longitude, targetAccountNumber);
    }
}
