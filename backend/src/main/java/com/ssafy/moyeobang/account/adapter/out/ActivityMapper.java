package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.bank.response.TransactionHistoryResponse;
import com.ssafy.moyeobang.account.application.domain.Activity;
import com.ssafy.moyeobang.account.application.domain.ActivityWindow;
import com.ssafy.moyeobang.account.application.domain.Money;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {

    public ActivityWindow mapToActivityWindow(List<TransactionHistoryResponse> transactionHistories, String accountNumber) {
        List<Activity> deposits = transactionHistories.stream()
                .filter(TransactionHistoryResponse::isDeposit)
                .map(transactionHistory -> mapToDepositActivity(accountNumber, transactionHistory))
                .toList();

        List<Activity> withdrawals = transactionHistories.stream()
                .filter(TransactionHistoryResponse::isWithdrawal)
                .map(transactionHistory -> mapToWithdrawalActivity(accountNumber, transactionHistory))
                .toList();

        List<Activity> activities = Stream.concat(deposits.stream(), withdrawals.stream())
                .collect(Collectors.toCollection(ArrayList::new));

        return new ActivityWindow(activities);
    }

    private Activity mapToDepositActivity(String accountNumber, TransactionHistoryResponse transactionHistory) {
        return new Activity(
                transactionHistory.transactionUniqueNo(),
                accountNumber,
                transactionHistory.transactionAccountNo(),
                accountNumber,
                LocalDateTime.of(transactionHistory.transactionDate(), transactionHistory.transactionTime()),
                Money.of(transactionHistory.transactionBalance())
        );
    }

    private Activity mapToWithdrawalActivity(String accountNumber, TransactionHistoryResponse transactionHistory) {
        return new Activity(
                transactionHistory.transactionUniqueNo(),
                accountNumber,
                accountNumber,
                transactionHistory.transactionAccountNo(),
                LocalDateTime.of(transactionHistory.transactionDate(), transactionHistory.transactionTime()),
                Money.of(transactionHistory.transactionBalance())
        );
    }
}
