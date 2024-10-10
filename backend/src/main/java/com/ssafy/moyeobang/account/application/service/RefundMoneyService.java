package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
import com.ssafy.moyeobang.account.application.port.in.RefundMoneyUseCase;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class RefundMoneyService implements RefundMoneyUseCase {

    private final LoadAccountPort loadAccountPort;
    private final SendMoneyPort sendMoneyPort;

    @Override
    public void refundMoney(Long accountId) {
        TravelAccount account = loadAccountPort.loadTravelAccount(accountId);

        account.getMembers().getMembers().values()
                .stream()
                .filter(member -> account.getWithdrawAmountFor(member).isPositive())
                .forEach(member -> refund(account, member));
    }

    private void refund(TravelAccount account, Member member) {
        sendMoneyPort.refundMoney(
                account.getAccountNumber(),
                member.getAccountNumber(),
                account.getBalanceFor(member)
        );
    }
}
