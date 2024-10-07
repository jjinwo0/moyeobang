package com.ssafy.moyeobang.account.adapter.out.bank.request;

import com.ssafy.moyeobang.account.adapter.out.bank.Headers;

public record DepositRequest(Headers Header,
                             String accountNo,
                             Long transactionBalance) {
}
