package com.ssafy.moyeobang.account.adapter.out.bank.request;

import com.ssafy.moyeobang.account.adapter.out.bank.Headers;

public record TransactionHistoryRequest(Headers Header,
                                        String accountNo,
                                        String startDate,
                                        String endDate,
                                        String transactionType,
                                        String orderByType) {
}
