package com.ssafy.moyeobang.account.adapter.out.persistence.deposit;

import com.ssafy.moyeobang.common.persistenceentity.deposit.DepositJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepositRepositoryInAccount extends JpaRepository<DepositJpaEntity, Long> {
}
