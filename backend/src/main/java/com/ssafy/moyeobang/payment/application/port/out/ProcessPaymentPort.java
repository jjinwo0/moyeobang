package com.ssafy.moyeobang.payment.application.port.out;

import com.ssafy.moyeobang.payment.application.domain.Withdraw;

public interface ProcessPaymentPort {
    void saveWithdraw(Withdraw withdraw);
}
