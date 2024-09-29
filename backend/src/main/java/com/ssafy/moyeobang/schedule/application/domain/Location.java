package com.ssafy.moyeobang.schedule.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Location {
    private String address;
    private String googlePlaceId;
    private double latitude;
    private double longitude;

    public static Location of(String address, String googlePlaceId, double latitude, double longitude) {
        return new Location(address, googlePlaceId, latitude, longitude);
    }
}
