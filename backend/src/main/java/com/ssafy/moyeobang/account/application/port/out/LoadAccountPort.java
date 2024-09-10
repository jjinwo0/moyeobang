package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Account;

public interface LoadAccountPort {

    Account loadMemberAccount(Long memberId);

    Account loadTravelAccount(String accountNumber);
}
