package com.ssafy.moyeobang.common.config.oauth.bank.request;

import com.ssafy.moyeobang.common.config.oauth.bank.CommonHeaders;

public record CreateAccountRequestInCommon(CommonHeaders Header, String accountTypeUniqueNo) {
}