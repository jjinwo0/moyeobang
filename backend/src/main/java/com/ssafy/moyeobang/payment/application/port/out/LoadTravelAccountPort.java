package com.ssafy.moyeobang.payment.application.port.out;

import com.ssafy.moyeobang.payment.application.domain.TravelAccount;

public interface LoadTravelAccountPort {
    TravelAccount loadTravelAccount(String accountNumber);

    int loadMemberCount(String accountNumber);
}
