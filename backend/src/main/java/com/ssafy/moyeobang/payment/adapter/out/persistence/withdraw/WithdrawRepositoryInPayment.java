package com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepositoryInPayment extends JpaRepository<WithdrawJpaEntity, Long> {
}
