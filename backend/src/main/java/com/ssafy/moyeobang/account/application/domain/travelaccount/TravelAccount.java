package com.ssafy.moyeobang.account.application.domain.travelaccount;

import com.ssafy.moyeobang.account.application.domain.Money;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TravelAccount {

    private final String accountNumber;
    private final Members members;
    private final Transactions transactions;

    public Money getBalance() {
        return Money.subtract(
                transactions.getDepositBalance(),
                transactions.getWithdrawalBalance()
        );
    }
}
