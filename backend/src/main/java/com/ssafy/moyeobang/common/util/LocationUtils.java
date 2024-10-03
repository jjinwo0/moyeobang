package com.ssafy.moyeobang.common.util;

/**
 * 하버사인 공식 계산을 위해 사용하는 유틸 클래스
 *
 * @author hunmin
 */
public class LocationUtils {

    private static final double EARTH_RADIUS = 6371.0;

    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    public boolean isWithinRadius(double lat1, double lon1, double lat2, double lon2, double radius) {
        double distance = calculateDistance(lat1, lon1, lat2, lon2);
        return distance <= radius;
    }


}
