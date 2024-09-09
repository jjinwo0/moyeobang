package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.adapter.in.web.response.CreateAccountResponse;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.in.CreateAccountUseCase;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateAccountService implements CreateAccountUseCase {

    private final LoadMemberPort loadMemberPort;
    private final CreateAccountPort createAccountPort;

    @Override
    public CreateAccountResponse createAccount(Long memberId) {
        Member member = loadMemberPort.loadMember(memberId);

        String accountNumber = createAccountPort.createAccount(member.getMemberKey());

        return new CreateAccountResponse(accountNumber);
    }
}
