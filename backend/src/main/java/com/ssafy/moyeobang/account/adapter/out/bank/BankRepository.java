package com.ssafy.moyeobang.account.adapter.out.bank;

import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.post;
import static java.time.LocalDateTime.now;

import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.GetBalanceRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankRepository {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

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
