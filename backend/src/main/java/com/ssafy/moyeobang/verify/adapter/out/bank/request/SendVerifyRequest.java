package com.ssafy.moyeobang.verify.adapter.out.bank.request;

import com.ssafy.moyeobang.verify.adapter.out.bank.HeaderFormat;

public record SendVerifyRequest(HeaderFormat Header, String accountNo, String authText) {
}
