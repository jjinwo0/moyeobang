package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberAccountRepositoryInNotification extends JpaRepository<MemberAccountJpaEntity, Long> {

    @Query("select a from MemberAccountJpaEntity a join fetch a.member where a.member.id = :memberId")
    Optional<MemberAccountJpaEntity> findMemberAccountByMemberId(@Param("memberId") Long memberId);
}
