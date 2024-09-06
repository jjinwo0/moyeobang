package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepository extends JpaRepository<WithdrawEntity, Long> {
}
