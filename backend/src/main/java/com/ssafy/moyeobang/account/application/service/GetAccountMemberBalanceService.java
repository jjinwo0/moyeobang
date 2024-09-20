package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetAccountMemberBalanceResponse;
import com.ssafy.moyeobang.account.application.domain.Account;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.in.GetAccountMemberBalanceQuery;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetAccountMemberBalanceService implements GetAccountMemberBalanceQuery {

    private final LoadMemberPort loadMemberPort;
    private final LoadAccountPort loadAccountPort;

    @Override
    public GetAccountMemberBalanceResponse getAccountMemberBalance(String accountNumber, Long memberId) {
        Account account = loadAccountPort.loadAccount(accountNumber);

        Member member = loadMemberPort.loadMember(memberId);

        return new GetAccountMemberBalanceResponse(
                member.getId(),
                member.getName(),
                member.getProfileImage(),
                account.getBalanceFor(member),
                account.getDepositAmountFor(member),
                account.getWithdrawAmountFor(member)
        );
    }
}
