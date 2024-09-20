package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.travelaccount.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;

public interface LoadAccountPort {

    Account loadAccount(String accountNumber);

    MemberAccount loadMemberAccount(String accountNumber);

    TravelAccount loadTravelAccount(Long accountId);
}
