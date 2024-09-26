package com.ssafy.moyeobang.payment.adapter.out.bank;

import static com.ssafy.moyeobang.payment.adapter.out.bank.RestClientUtils.post;
import static com.ssafy.moyeobang.payment.adapter.out.bank.RestClientUtils.postWithoutResponse;
import static java.time.LocalDateTime.now;

import com.ssafy.moyeobang.payment.adapter.out.bank.request.CreateAccountRequest;
import com.ssafy.moyeobang.payment.adapter.out.bank.request.GetBalanceRequest;
import com.ssafy.moyeobang.payment.adapter.out.bank.request.PaymentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankApiClientInPayment {

    public static final String ACCOUNT_TYPE_NUMBER = "001-1-7ea6862a889c4d";

    public String createAccount(String memberKey) {
        CreateAccountRequest request = new CreateAccountRequest(
                Headers.withUserKey(memberKey, "createDemandDepositAccount", now()),
                ACCOUNT_TYPE_NUMBER
        );

        return post("/demandDeposit/createDemandDepositAccount", request)
                .path("REC")
                .path("accountNo")
                .asText();
    }

    public void payment(String targetAccountNumber, String sourceAccountNumber, String travelKey, long amount) {
        PaymentRequest request = new PaymentRequest(
                Headers.withCommonUserKey("updateDemandDepositAccountTransfer", travelKey, now()),
                targetAccountNumber,
                sourceAccountNumber,
                amount
        );

        postWithoutResponse("/demandDeposit/updateDemandDepositAccountTransfer", request);
    }

    public Long getBalance(String accountNumber, String travelKey) {
        GetBalanceRequest request = new GetBalanceRequest(
                Headers.withCommonUserKey("inquireDemandDepositAccountBalance", travelKey, now()),
                accountNumber
        );

        return post("/demandDeposit/inquireDemandDepositAccountBalance", request)
                .path("REC")
                .path("accountBalance")
                .asLong();
    }
}
