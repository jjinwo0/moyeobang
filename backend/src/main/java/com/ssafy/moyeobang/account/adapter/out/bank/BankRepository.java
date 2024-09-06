package com.ssafy.moyeobang.account.adapter.out.bank;

import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.post;
import static java.time.LocalDateTime.now;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankRepository {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

    public String createAccount(String memberKey) {
        CreateAccountRequest createAccountRequest = new CreateAccountRequest(
                Header.withUserKey(memberKey, "createDemandDepositAccount", now()),
                ACCOUNT_TYPE_NUMBER
        );

        return post("/demandDeposit/createDemandDepositAccount", createAccountRequest)
                .path("REC")
                .path("accountNo")
                .asText();
    }
}
