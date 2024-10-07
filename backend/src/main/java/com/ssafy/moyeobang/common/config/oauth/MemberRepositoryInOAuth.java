package com.ssafy.moyeobang.common.config.oauth;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepositoryInOAuth extends JpaRepository<MemberJpaEntity, Long> {

    @Query("select m from MemberJpaEntity m where m.email = :email")
    Optional<MemberJpaEntity> findByEmail(@Param("email") String email);
}
