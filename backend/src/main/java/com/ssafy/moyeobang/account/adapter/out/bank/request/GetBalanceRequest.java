package com.ssafy.moyeobang.account.adapter.out.bank.request;

import com.ssafy.moyeobang.account.adapter.out.bank.Headers;

public record GetBalanceRequest(Headers Header, String accountNo) {
}
