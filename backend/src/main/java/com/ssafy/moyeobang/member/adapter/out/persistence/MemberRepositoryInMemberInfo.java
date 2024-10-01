package com.ssafy.moyeobang.member.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInMemberInfo extends JpaRepository<MemberJpaEntity, Long> {
}
