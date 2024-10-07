package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepositoryInSettle extends JpaRepository<WithdrawJpaEntity, Long> {
}
