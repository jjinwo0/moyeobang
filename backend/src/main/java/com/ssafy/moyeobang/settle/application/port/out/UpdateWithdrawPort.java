package com.ssafy.moyeobang.settle.application.port.out;

public interface UpdateWithdrawPort {

    void updateWithdrawToReceipt(Long transactionId);

    void updateWithdrawToCustom(Long transactionId);
}
