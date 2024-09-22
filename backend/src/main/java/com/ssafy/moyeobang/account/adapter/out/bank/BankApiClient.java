package com.ssafy.moyeobang.account.adapter.out.bank;

import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.post;
import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.postConvertResponseToList;
import static com.ssafy.moyeobang.account.adapter.out.bank.RestClientUtils.postWithoutResponse;
import static java.time.LocalDateTime.now;

import com.ssafy.moyeobang.account.adapter.out.bank.request.CreateAccountRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.DepositRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.GetBalanceRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.SendMoneyRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.request.TransactionHistoryRequest;
import com.ssafy.moyeobang.account.adapter.out.bank.response.TransactionHistoryResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BankApiClient {

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

    public void deposit(String accountNumber, long amount) {
        DepositRequest request = new DepositRequest(
                Headers.withCommonUserKey("updateDemandDepositAccountDeposit", now()),
                accountNumber,
                amount
        );

        postWithoutResponse("/demandDeposit/updateDemandDepositAccountDeposit", request);
    }

    public void sendMoney(String targetAccountNumber, String sourceAccountNumber, long amount) {
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

    public List<TransactionHistoryResponse> getTransactionHistories(String accountNumber) {
        TransactionHistoryRequest request = new TransactionHistoryRequest(
                Headers.withCommonUserKey("inquireTransactionHistoryList", now()),
                accountNumber
        );

        return postConvertResponseToList(
                "/demandDeposit/inquireTransactionHistoryList",
                request,
                TransactionHistoryResponse.class
        );
    }
}
