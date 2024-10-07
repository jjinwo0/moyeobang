package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoryResponse;

public interface GetTransactionHistoryQuery {

    GetTransactionHistoryResponse getTransactionHistory(Long accountId, Long transactionId);
}
