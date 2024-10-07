package com.ssafy.moyeobang.account.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAccountRepositoryInAccount extends JpaRepository<MemberAccountJpaEntity, Long> {

    Optional<MemberAccountJpaEntity> findByMemberId(Long memberId);

    Optional<MemberAccountJpaEntity> findByAccountNumber(String accountNumber);
}
