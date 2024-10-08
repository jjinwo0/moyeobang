package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberOrderHistoryRepositoryInAccount extends JpaRepository<MemberOrderHistoryJpaEntity, Long> {
}
