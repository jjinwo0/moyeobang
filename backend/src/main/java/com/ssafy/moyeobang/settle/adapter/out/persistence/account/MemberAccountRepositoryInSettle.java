package com.ssafy.moyeobang.settle.adapter.out.persistence.account;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAccountRepositoryInSettle extends JpaRepository<MemberAccountJpaEntity, Long> {
}
