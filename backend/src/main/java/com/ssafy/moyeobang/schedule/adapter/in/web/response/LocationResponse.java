package com.ssafy.moyeobang.schedule.adapter.in.web.response;

public record LocationResponse(String googlePlaceId, String title, String address, double latitude, double longitude,
                               String category) {
}
