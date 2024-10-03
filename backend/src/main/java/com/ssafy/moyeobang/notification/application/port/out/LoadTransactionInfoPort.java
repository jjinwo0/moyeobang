package com.ssafy.moyeobang.notification.application.port.out;

public interface LoadTransactionInfoPort {

    String getKey(String teamKey, String accountNo, Long transactionId);
}
