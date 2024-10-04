package com.ssafy.moyeobang.payment.application.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

import com.ssafy.moyeobang.common.util.LocationUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class LocationCalcTest {

    private final LocationUtils locationUtils = new LocationUtils();

    @DisplayName("두 장소의 위도 경도가 주어지면 거리 계산값이 반환된다")
    @Test
    void calculateDistance_returnsCorrectDistance() {
        // Given
        double lat1 = 37.7749;
        double lon1 = -122.4194;
        double lat2 = 34.0522;
        double lon2 = -118.2437;

        // When
        double distance = locationUtils.calculateDistance(lat1, lon1, lat2, lon2);

        // Then
        assertThat(distance).isCloseTo(559.0, within(1.0));
    }
}
