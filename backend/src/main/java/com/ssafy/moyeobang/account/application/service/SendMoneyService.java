package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyCommand;
import com.ssafy.moyeobang.account.application.port.in.SendMoneyUseCase;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.account.application.port.out.SendMoneyPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class SendMoneyService implements SendMoneyUseCase {

    private final LoadMemberPort loadMemberPort;
    private final LoadAccountPort loadAccountPort;
    private final SendMoneyPort sendMoneyPort;

    @Override
    public void sendMoney(SendMoneyCommand command) {
        Member member = loadMemberPort.loadMember(command.memberId());

        Account sourceAccount = loadAccountPort.loadAccount(member.getAccountNumber());
        Account targetAccount = loadAccountPort.loadAccount(command.targetAccountNumber());

        sourceAccount.withdraw(targetAccount, command.money());
        targetAccount.deposit(sourceAccount, command.money());

        sendMoneyPort.sendMoney(
                sourceAccount.getAccountNumber(),
                targetAccount.getAccountNumber(),
                command.money()
        );
    }
}
