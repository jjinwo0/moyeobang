package com.ssafy.moyeobang.payment.adapter.out.bank.request;

import com.ssafy.moyeobang.payment.adapter.out.bank.Headers;

public record CreateAccountRequest(Headers headers, String accountTypeUniqueNo) {
}