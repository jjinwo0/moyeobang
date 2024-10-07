package com.ssafy.moyeobang.settle.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInSettle extends JpaRepository<MemberJpaEntity, Long> {
}
