package com.ssafy.moyeobang.notification.application.port.out;

import com.ssafy.moyeobang.notification.application.domain.Travel;

public interface LoadTravelPort {

    Travel findById(Long id);
}
