package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.account.Account;

public interface FindTravelAccountPort {

    Account findTravelAccount(Long travelAccountId);
}
