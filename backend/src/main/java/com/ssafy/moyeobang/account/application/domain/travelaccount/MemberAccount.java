package com.ssafy.moyeobang.account.application.domain.travelaccount;

import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.error.InsufficientBalanceException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberAccount {

    private final String accountNumber;
    private final Money balance;

    public void withdraw(Money money) {
        if (couldNotWithdraw(money)) {
            throw new InsufficientBalanceException();
        }
    }

    private boolean couldNotWithdraw(Money money) {
        return !Money.subtract(balance, money).isPositiveOrZero();
    }
}
