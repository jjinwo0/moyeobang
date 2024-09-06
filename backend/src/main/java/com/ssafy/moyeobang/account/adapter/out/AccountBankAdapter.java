package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.bank.BankRepository;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.AccountJpaEntity;
import com.ssafy.moyeobang.account.adapter.out.persistence.account.AccountRepository;
import com.ssafy.moyeobang.account.application.port.out.CreateAccountPort;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class AccountBankAdapter implements CreateAccountPort {

    private final AccountRepository accountRepository;
    private final BankRepository bankRepository;

    @Override
    public String createAccount(String memberKey) {
        String accountNumber = bankRepository.createAccount(memberKey);

        AccountJpaEntity account = AccountJpaEntity.builder()
                .accountNumber(accountNumber)
                .build();

        accountRepository.save(account);

        return accountNumber;
    }
}
