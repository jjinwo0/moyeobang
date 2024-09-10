package com.ssafy.moyeobang.account.adapter.out.bank.response;

import static com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;

public record TransactionHistoryResponse(Long transactionUniqueNo,
                                         @JsonFormat(shape = STRING, pattern = "yyyyMMdd") LocalDate transactionDate,
                                         @JsonFormat(shape = STRING, pattern = "HHmmss") LocalTime transactionTime,
                                         String transactionType,
                                         String transactionTypeName,
                                         String transactionAccountNo,
                                         Long transactionBalance,
                                         String transactionAfterBalance,
                                         String transactionSummary,
                                         String transactionMemo) {

    public boolean isDeposit() {
        return transactionTypeName.equals("입금(이체)");
    }

    public boolean isWithdrawal() {
        return transactionTypeName.equals("출금(이체)");
    }
}
