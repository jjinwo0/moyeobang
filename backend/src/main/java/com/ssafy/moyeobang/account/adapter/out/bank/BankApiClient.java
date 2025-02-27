package com.ssafy.moyeobang.account.adapter.out.bank;

import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.post;
import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.postWithBaseUrl;
import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.postWithoutResponse;
import static java.time.LocalDateTime.now;

import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateTeamKeyRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.GetBalanceRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.SendMoneyRequest;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankApiClient {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

    public String createTravelKey() {
        CreateTeamKeyRequest request = new CreateTeamKeyRequest(
                "e218423b4af644c6ad9f3ae58e27af3c",
                createUniqueString() + "@ssafy.com"
        );

        return postWithBaseUrl("https://finopenapi.ssafy.io/ssafy/api/v1/member", request)
                .path("userKey")
                .asText();
    }

    public String createAccount(String teamKey) {
        CreateAccountRequest request = new CreateAccountRequest(
                Headers.withUserKey(teamKey, "createDemandDepositAccount", now()),
                ACCOUNT_TYPE_NUMBER
        );

        return post("/demandDeposit/createDemandDepositAccount", request)
                .path("REC")
                .path("accountNo")
                .asText();
    }

    public void sendMoney(String memberKey, String targetAccountNumber, String sourceAccountNumber, long amount) {
        SendMoneyRequest request = new SendMoneyRequest(
                Headers.withUserKey(memberKey, "updateDemandDepositAccountTransfer", now()),
                targetAccountNumber,
                sourceAccountNumber,
                amount
        );

        postWithoutResponse("/demandDeposit/updateDemandDepositAccountTransfer", request);
    }

    public Long getBalance(String memberKey, String accountNumber) {
        GetBalanceRequest request = new GetBalanceRequest(
                Headers.withUserKey(memberKey, "inquireDemandDepositAccountBalance", now()),
                accountNumber
        );

        return post("/demandDeposit/inquireDemandDepositAccountBalance", request)
                .path("REC")
                .path("accountBalance")
                .asLong();
    }

    private String createUniqueString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
