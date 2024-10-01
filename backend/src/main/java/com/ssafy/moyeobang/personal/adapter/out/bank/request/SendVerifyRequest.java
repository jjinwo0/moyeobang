package com.ssafy.moyeobang.personal.adapter.out.bank.request;

import com.ssafy.moyeobang.personal.adapter.out.bank.HeaderFormat;

public record SendVerifyRequest(HeaderFormat Header, String accountNo, String authText) {
}
