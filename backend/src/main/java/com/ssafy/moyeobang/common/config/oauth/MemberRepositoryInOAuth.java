package com.ssafy.moyeobang.common.config.oauth;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepositoryInOAuth extends JpaRepository<MemberJpaEntity, Long> {

    Optional<MemberJpaEntity> findByEmail(String email);
}
