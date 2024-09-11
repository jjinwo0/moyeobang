package com.ssafy.moyeobang.notification.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberJpaEntity, Long> {

    Optional<MemberJpaEntity> findByEmail(String email);
}
