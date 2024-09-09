package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberOrderHistoryRepositoryInSettle extends JpaRepository<MemberOrderHistoryJpaEntity, Long> {
}
