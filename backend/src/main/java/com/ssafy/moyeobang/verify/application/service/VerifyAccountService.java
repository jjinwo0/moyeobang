package com.ssafy.moyeobang.verify.application.service;

import com.ssafy.moyeobang.common.config.jwt.TokenManager;
import com.ssafy.moyeobang.verify.adapter.out.bank.BankApiClientInVerify;
import com.ssafy.moyeobang.verify.application.port.in.VerifyAccountUseCase;
import com.ssafy.moyeobang.verify.application.port.out.LoadMemberKeyPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VerifyAccountService implements VerifyAccountUseCase {

    private final BankApiClientInVerify client;

    private final TokenManager tokenManager;

    private final LoadMemberKeyPort loadMemberKeyPort;

    @Override
    public Long verifyAccount(String token, String accountNumber, String bankName) {

        Long findMemberId = tokenManager.getMemberId(token);

        String memberKey = loadMemberKeyPort.loadMemberKey(findMemberId);

        return client.sendVerify(accountNumber, memberKey);
    }

    @Override
    public String checkVerifyAccount(String token, String accountNumber, String authCode) {

        Long findMemberId = tokenManager.getMemberId(token);

        String memberKey = loadMemberKeyPort.loadMemberKey(findMemberId);

        return client.verifyAccount(accountNumber, memberKey, authCode);
    }
}
