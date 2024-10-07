package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.notification.adapter.out.bank.BankApiClientInNotification;
import com.ssafy.moyeobang.notification.adapter.out.persistence.TravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.port.out.LoadTransactionInfoPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionInfoAdapterInNotification implements LoadTransactionInfoPort {

    private final BankApiClientInNotification bankApiClient;

    @Override
    public String getKey(String teamKey, String accountNo, Long transactionId) {

        return bankApiClient.getTransactionInfo(teamKey, accountNo, transactionId);
    }
}
