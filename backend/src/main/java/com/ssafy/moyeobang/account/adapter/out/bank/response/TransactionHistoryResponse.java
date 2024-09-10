package com.ssafy.moyeobang.account.adapter.out.bank.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record TransactionHistoryResponse(Long transactionUniqueNo,
                                         LocalDate transactionDate,
                                         LocalTime transactionTime,
                                         String transactionType,
                                         String transactionTypeName,
                                         String transactionAccountNo,
                                         Long transactionBalance,
                                         String transactionAfterBalance,
                                         String transactionSummary,
                                         String transactionMemo) {

    public boolean isDeposit() {
        return transactionType.equals("입금(이체)");
    }

    public boolean isWithdrawal() {
        return transactionType.equals("출금(이체)");
    }
}
