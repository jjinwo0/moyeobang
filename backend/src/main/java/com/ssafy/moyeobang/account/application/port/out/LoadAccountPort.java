package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Account;

public interface LoadAccountPort {

    Account loadAccount(String accountNumber);
}
