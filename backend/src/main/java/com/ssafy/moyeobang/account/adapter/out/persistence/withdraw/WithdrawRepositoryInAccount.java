package com.ssafy.moyeobang.account.adapter.out.persistence.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepositoryInAccount extends JpaRepository<WithdrawJpaEntity, Long> {
}
