package com.ssafy.moyeobang.account.adapter.out.bank.response;

public record TransactionHistoryResponse(String transactionUniqueNo,
                                         String transactionDate,
                                         String transactionTime,
                                         String transactionType,
                                         String transactionTypeName,
                                         String transactionAccountNo,
                                         String transactionBalance,
                                         String transactionAfterBalance,
                                         String transactionSummary,
                                         String transactionMemo) {
}
