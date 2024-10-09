package com.ssafy.moyeobang.common.config.oauth.bank;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberAccountRepository extends JpaRepository<MemberAccountJpaEntity, Long> {

    @Query("select ma from MemberAccountJpaEntity ma join fetch ma.member where ma.member.id = :memberId")
    Optional<MemberAccountJpaEntity> findByMemberId(@Param("memberId") Long memberId);
}
