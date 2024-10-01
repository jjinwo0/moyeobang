package com.ssafy.moyeobang.personal.application.service;

import com.ssafy.moyeobang.personal.adapter.out.bank.BankApiClientInVerify;
import com.ssafy.moyeobang.personal.application.port.in.VerifyAccountUseCase;
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

    @Override
    public Long verifyAccount(String token, String accountNumber, String bankName) {

        return client.sendVerify(accountNumber, bankName);
    }
}
