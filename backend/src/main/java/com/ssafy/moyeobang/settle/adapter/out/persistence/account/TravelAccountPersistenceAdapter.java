package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelAccountJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Account;
import com.ssafy.moyeobang.settle.application.port.out.FindTravelAccountPort;
import com.ssafy.moyeobang.settle.error.AccountNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TravelAccountPersistenceAdapter implements FindTravelAccountPort {

    private final TravelAccountRepositoryInSettle travelAccountRepository;
    private final AccountMapper accountMapper;

    @Override
    public Account findTravelAccount(Long travelAccountId) {

        TravelAccountJpaEntity travelAccountEntity = travelAccountRepository.findByIdWithTravel(travelAccountId)
                .orElseThrow(() -> new AccountNotFoundException(
                        "Travel Account id[" + travelAccountId + "] 계좌 정보를 찾을 수 없습니다."));

        return accountMapper.mapToTravelDomain(travelAccountEntity);
    }
}
