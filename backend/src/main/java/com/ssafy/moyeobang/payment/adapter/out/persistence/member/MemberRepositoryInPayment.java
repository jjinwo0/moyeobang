package com.ssafy.moyeobang.payment.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInPayment extends JpaRepository<MemberJpaEntity, Long> {
}
