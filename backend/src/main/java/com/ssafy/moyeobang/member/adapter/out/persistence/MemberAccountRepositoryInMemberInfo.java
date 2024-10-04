package com.ssafy.moyeobang.member.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberAccountRepositoryInMemberInfo extends JpaRepository<MemberAccountJpaEntity, Long> {

    @Query("select ma from MemberAccountJpaEntity ma join fetch ma.member where ma.member.id = :memberId")
    Optional<MemberAccountJpaEntity> findByMemberId(@Param("memberId") Long memberId);
}
