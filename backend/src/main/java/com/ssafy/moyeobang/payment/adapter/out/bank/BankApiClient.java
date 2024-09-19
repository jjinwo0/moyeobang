package com.ssafy.moyeobang.payment.adapter.out.bank;

import static com.ssafy.moyeobang.payment.adapter.out.bank.RestClientUtils.post;
import static com.ssafy.moyeobang.payment.adapter.out.bank.RestClientUtils.postWithoutResponse;
import static java.time.LocalDateTime.now;

import com.ssafy.moyeobang.payment.adapter.out.bank.request.GetBalanceRequest;
import com.ssafy.moyeobang.payment.adapter.out.bank.request.SendMoneyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankApiClient {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";


    public void payment(String targetAccountNumber, String sourceAccountNumber, long amount) {
        SendMoneyRequest request = new SendMoneyRequest(
                Headers.withCommonUserKey("updateDemandDepositAccountTransfer", now()),
                targetAccountNumber,
                sourceAccountNumber,
                amount
        );

        postWithoutResponse("/demandDeposit/updateDemandDepositAccountTransfer", request);
    }

    public Long getBalance(String accountNumber) {
        GetBalanceRequest request = new GetBalanceRequest(
                Headers.withCommonUserKey("inquireDemandDepositAccountBalance", now()),
                accountNumber
        );

        return post("/demandDeposit/inquireDemandDepositAccountBalance", request)
                .path("REC")
                .path("accountBalance")
                .asLong();
    }
}
