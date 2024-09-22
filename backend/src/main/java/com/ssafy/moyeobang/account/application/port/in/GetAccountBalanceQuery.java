package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountBalanceResponse;

public interface GetAccountBalanceQuery {

    GetAccountBalanceResponse getAccountBalance(Long accountId);
}
