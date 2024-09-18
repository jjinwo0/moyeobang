package com.ssafy.moyeobang.payment.application.port.out;


import com.ssafy.moyeobang.payment.application.domain.Money;
import com.ssafy.moyeobang.payment.application.domain.Store;
import com.ssafy.moyeobang.payment.application.domain.TravelAccount;

public interface ProcessPaymentPort {
    void processPayment(TravelAccount travelAccount, Store store, Money paymentRequestMoney);
}
