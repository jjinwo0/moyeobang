package com.ssafy.moyeobang.member.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberInfoMapper {

    public MemberInfo mapToDomain(MemberJpaEntity entity, MemberAccountJpaEntity accountEntity) {

        return MemberInfo.of(
                entity.getId(),
                entity.getUsername(),
                entity.getProfile(),
                accountEntity.getBankName(),
                accountEntity.getAccountNumber()
        );
    }
}
