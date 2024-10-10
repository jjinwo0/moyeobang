package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Travel;

public interface LoadTravelPort {

    Travel findById(Long id);
}
