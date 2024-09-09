package com.ssafy.moyeobang.account.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAccountRepository extends JpaRepository<MemberAccountJpaEntity, Long> {

    MemberAccountJpaEntity findByAccountNumber(String accountNumber);
}
