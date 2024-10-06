package com.ssafy.moyeobang.schedule.adapter.in.web.request;

import com.ssafy.moyeobang.schedule.application.port.in.LocationInfoCommand;

public record LocationInfo(String googlePlaceId, String title, String address, double latitude, double longitude,
                           String category) {

    public LocationInfoCommand toCommand() {
        return new LocationInfoCommand(googlePlaceId, title, address, latitude, longitude, category);
    }
}
