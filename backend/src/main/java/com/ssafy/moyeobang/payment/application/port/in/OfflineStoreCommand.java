package com.ssafy.moyeobang.payment.application.port.in;

import static com.ssafy.moyeobang.common.util.ValidationUtils.validate;

import com.ssafy.moyeobang.payment.application.domain.Store;
import jakarta.validation.constraints.NotNull;

public record OfflineStoreCommand(
        @NotNull String placeId,
        @NotNull String placeName,
        @NotNull String placeAddress,
        @NotNull Double latitude,
        @NotNull Double longitude,
        @NotNull String targetAccountNumber,
        String tag) implements StoreCommand {

    public static OfflineStoreCommand createAndValidate(String placeId, String placeName, String placeAddress,
                                                        Double latitude,
                                                        Double longitude, String targetAccountNumber, String tag) {
        OfflineStoreCommand offlineStoreCommand = new OfflineStoreCommand(placeId, placeName, placeAddress, latitude,
                longitude,
                targetAccountNumber, tag);
        validate(offlineStoreCommand);
        return offlineStoreCommand;
    }


    public Store toDomain() {
        return Store.of(placeId, placeName, placeAddress, latitude, longitude, targetAccountNumber, tag);
    }
}
