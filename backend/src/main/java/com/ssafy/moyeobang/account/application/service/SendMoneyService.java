package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.domain.MemberAccount;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
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

        MemberAccount sourceAccount = loadAccountPort.loadMemberAccount(member.getAccountNumber());
        TravelAccount targetAccount = loadAccountPort.loadTravelAccount(command.travelAccountId());

        sourceAccount.withdraw(command.money());
        targetAccount.deposit(member, command.money());

        sendMoneyPort.sendMoney(
                sourceAccount.getAccountNumber(),
                targetAccount.getAccountNumber(),
                command.money()
        );
    }
}
