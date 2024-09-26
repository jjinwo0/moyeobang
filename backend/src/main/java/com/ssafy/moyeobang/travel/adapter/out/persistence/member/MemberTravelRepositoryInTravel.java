package com.ssafy.moyeobang.travel.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTravelRepositoryInTravel extends JpaRepository<MemberTravelJpaEntity, Long> {
}
