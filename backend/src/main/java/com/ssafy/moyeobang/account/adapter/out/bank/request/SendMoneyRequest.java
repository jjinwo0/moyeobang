package com.ssafy.moyeobang.account.adapter.out.bank.request;

import com.ssafy.moyeobang.account.adapter.out.bank.Headers;

public record SendMoneyRequest(Headers Header,
                               String depositAccountNo,
                               String withdrawalAccountNo,
                               Long transactionBalance) {
}
