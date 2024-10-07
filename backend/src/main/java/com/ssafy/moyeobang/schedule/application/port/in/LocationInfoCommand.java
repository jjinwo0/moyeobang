package com.ssafy.moyeobang.schedule.application.port.in;

import com.ssafy.moyeobang.schedule.adapter.in.web.request.LocationInfo;
import jakarta.validation.constraints.NotNull;


public record LocationInfoCommand(@NotNull String googlePlaceId, @NotNull String title, @NotNull String address,
                                  @NotNull double lat, @NotNull double lng,
                                  @NotNull String category) {

    public static LocationInfoCommand of(LocationInfo locationInfo) {
        return new LocationInfoCommand(
                locationInfo.googlePlaceId(),
                locationInfo.title(),
                locationInfo.address(),
                locationInfo.latitude(),
                locationInfo.longitude(),
                locationInfo.category()
        );
    }
}
