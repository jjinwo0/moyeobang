package com.ssafy.moyeobang.account.adapter.out.bank;

import static java.time.LocalDateTime.now;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.common.annotation.BankAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestClient;

@BankAdapter
@RequiredArgsConstructor
public class AccountBankApiAdapter implements CreateAccountPort {

    private final ObjectMapper objectMapper;

    @Override
    public String createAccount(String memberKey) {
        RestClient restClient = RestClient.create();

        CreateAccountRequest createAccountRequest = new CreateAccountRequest(
                Header.withUserKey(memberKey, "createDemandDepositAccount", now()),
                "999-1-8142cf9d861b42"
        );

        String data = restClient.post()
                .uri("https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit/createDemandDepositAccount")
                .contentType(APPLICATION_JSON)
                .body(createAccountRequest)
                .retrieve()
                .toEntity(String.class)
                .getBody();

        try {
            return objectMapper.readTree(data)
                    .path("REC")
                    .path("accountNo")
                    .asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private record CreateAccountRequest(Header Header, String accountTypeUniqueNo) {
    }
}
