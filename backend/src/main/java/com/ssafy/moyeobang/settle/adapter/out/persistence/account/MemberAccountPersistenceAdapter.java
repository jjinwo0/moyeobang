package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.application.port.out.FindMemberAccountPort;
import com.ssafy.moyeobang.settle.error.AccountNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberAccountPersistenceAdapter implements FindMemberAccountPort {

    private final MemberAccountRepositoryInSettle accountRepository;
    private final AccountMapperInSettle accountMapperInSettle;

    @Override
    public Account findMemberAccount(Long accountId) {

        MemberAccountJpaEntity accountEntity = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account id[" + accountId + "] 계좌 정보를 찾지 못했습니다."));

        return accountMapperInSettle.mapToDomain(accountEntity);
    }
}
