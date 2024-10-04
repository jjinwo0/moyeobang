package com.ssafy.moyeobang.notification.adapter.out.bank;

import com.ssafy.moyeobang.notification.adapter.out.bank.request.GetTransactionInfoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.ssafy.moyeobang.notification.adapter.out.bank.RestClientUtilsInNotification.post;
import static java.time.LocalDateTime.now;

@Component
@RequiredArgsConstructor
public class BankApiClientInNotification {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

    public String getTransactionInfo(String teamKey, String accountNo, Long transactionUniqueNo) {

        GetTransactionInfoRequest request = new GetTransactionInfoRequest(
                HeaderFormatInNotification.withUserKey(teamKey, "inquireTransactionHistory", now()),
                accountNo,
                transactionUniqueNo
        );

        return post("/demandDeposit/inquireTransactionHistory", request)
                .path("REC")
                .path("transactionMemo")
                .asText();
    }
}
