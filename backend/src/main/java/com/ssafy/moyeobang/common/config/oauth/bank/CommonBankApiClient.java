package com.ssafy.moyeobang.common.config.oauth.bank;

import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateTeamKeyRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.GetBalanceRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.SendMoneyRequest;
import com.ssafy.moyeobang.common.config.oauth.bank.request.CreateAccountRequestInCommon;
import com.ssafy.moyeobang.common.config.oauth.bank.request.CreateTeamKeyRequestCommon;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

import static com.ssafy.moyeobang.common.config.oauth.bank.CommonRestClientUtils.post;
import static com.ssafy.moyeobang.common.config.oauth.bank.CommonRestClientUtils.postWithBaseUrl;
import static java.time.LocalDateTime.now;

@Component
@RequiredArgsConstructor
public class CommonBankApiClient {

    public static final String ACCOUNT_TYPE_NUMBER = "999-1-8142cf9d861b42";

    public String createMemberKey() {
        CreateTeamKeyRequestCommon request = new CreateTeamKeyRequestCommon(
                "e218423b4af644c6ad9f3ae58e27af3c",
                createUniqueString() + "@ssafy.com"
        );

        return postWithBaseUrl("https://finopenapi.ssafy.io/ssafy/api/v1/member", request)
                .path("userKey")
                .asText();
    }

    public String createAccount(String memberKey) {
        CreateAccountRequestInCommon request = new CreateAccountRequestInCommon(
                CommonHeaders.withUserKey(memberKey, "createDemandDepositAccount", now()),
                ACCOUNT_TYPE_NUMBER
        );

        return post("/demandDeposit/createDemandDepositAccount", request)
                .path("REC")
                .path("accountNo")
                .asText();
    }

    private String createUniqueString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
