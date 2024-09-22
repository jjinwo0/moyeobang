package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountMemberBalanceResponse;

public interface GetAccountMemberBalanceQuery {

    GetAccountMemberBalanceResponse getAccountMemberBalance(String accountNumber, Long memberId);
}
