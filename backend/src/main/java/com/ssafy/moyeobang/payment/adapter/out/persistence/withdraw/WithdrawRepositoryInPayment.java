package com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw;

import com.ssafy.moyeobang.payment.application.domain.Withdraw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepositoryInPayment extends JpaRepository<Withdraw, Long> {
}
