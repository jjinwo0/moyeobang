package com.ssafy.moyeobang.payment.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTravelRepositoryInPayment extends JpaRepository<MemberTravelJpaEntity, Long> {
}
