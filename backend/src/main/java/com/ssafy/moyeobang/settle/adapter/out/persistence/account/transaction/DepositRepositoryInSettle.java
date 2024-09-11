package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepositRepositoryInSettle extends JpaRepository<DepositJpaEntity, Long> {
}
