package com.ssafy.moyeobang.account.application.port.out;

import com.ssafy.moyeobang.account.application.domain.Money;

public interface SendMoneyPort {

    void sendMoney(String sourceAccount, String targetAccount, Money money);
}
