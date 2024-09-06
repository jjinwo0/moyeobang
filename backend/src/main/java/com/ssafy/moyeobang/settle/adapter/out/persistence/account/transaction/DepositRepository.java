package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DepositRepository extends JpaRepository<DepositEntity, Long> {
}
