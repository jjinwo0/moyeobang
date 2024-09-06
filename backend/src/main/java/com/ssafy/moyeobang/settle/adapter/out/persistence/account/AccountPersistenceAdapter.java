package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.application.error.AccountNotFoundException;
import com.ssafy.moyeobang.settle.application.port.out.FindAccountPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class AccountPersistenceAdapter implements FindAccountPort {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public Account findAccount(Long accountId) {

        AccountEntity accountEntity = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account id[" + accountId + "] 계좌 정보를 찾지 못했습니다."));

        return accountMapper.mapToDomain(accountEntity);
    }
}
