package com.ssafy.moyeobang.travel.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInTravel extends JpaRepository<MemberJpaEntity, Long> {
}
