package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTravelRepositoryInAccount extends JpaRepository<MemberTravelJpaEntity, Long> {
}
