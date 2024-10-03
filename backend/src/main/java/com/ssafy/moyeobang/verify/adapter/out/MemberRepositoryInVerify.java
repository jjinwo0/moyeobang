package com.ssafy.moyeobang.verify.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInVerify extends JpaRepository<MemberJpaEntity, Long> {
}
