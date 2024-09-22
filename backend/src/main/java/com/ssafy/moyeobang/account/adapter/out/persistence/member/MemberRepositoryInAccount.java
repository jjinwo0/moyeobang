package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInAccount extends JpaRepository<MemberJpaEntity, Long> {
}
