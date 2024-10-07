package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;

public interface LoadAccountPort {

    MemberAccount loadMemberAccount(String accountNumber);

    TravelAccount loadTravelAccount(Long accountId);
}
