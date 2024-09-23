package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.notification.application.domain.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public Member mapToDomain(MemberJpaEntity memberJpaEntity) {

        return Member.of(
                memberJpaEntity.getId(),
                memberJpaEntity.getEmail(),
                memberJpaEntity.getFCMToken()
        );
    }
}
