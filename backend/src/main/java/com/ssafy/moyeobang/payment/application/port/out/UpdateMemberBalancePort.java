package com.ssafy.moyeobang.payment.application.port.out;

import com.ssafy.moyeobang.payment.application.domain.Money;

public interface UpdateMemberBalancePort {
    void updateMemberBalances(String travelAccountNumber, Money paymentRequestMoney);
}
