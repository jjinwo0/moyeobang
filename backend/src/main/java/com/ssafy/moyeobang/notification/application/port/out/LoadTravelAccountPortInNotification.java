package com.ssafy.moyeobang.notification.application.port.out;

import com.ssafy.moyeobang.notification.application.domain.TravelAccount;

public interface LoadTravelAccountPortInNotification {

    TravelAccount findTravelAccountById(Long id);
}
