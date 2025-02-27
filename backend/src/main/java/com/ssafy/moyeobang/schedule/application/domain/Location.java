package com.ssafy.moyeobang.schedule.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Location {
    private String title;
    private String address;
    private String googlePlaceId;
    private double latitude;
    private double longitude;
    private String category;

    public static Location of(String title, String address, String googlePlaceId, double latitude, double longitude,
                              String category) {
        return new Location(title, address, googlePlaceId, latitude, longitude, category);
    }
}
