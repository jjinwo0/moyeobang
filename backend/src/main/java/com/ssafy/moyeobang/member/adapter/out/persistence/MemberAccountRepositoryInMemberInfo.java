package com.ssafy.moyeobang.member.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberAccountRepositoryInMemberInfo extends JpaRepository<MemberAccountJpaEntity, Long> {

    @Query("select ma from MemberAccountJpaEntity ma where ma.member.id = :memberId")
    Optional<MemberAccountJpaEntity> findByMemberId(@Param("memberId") Long memberId);
}
