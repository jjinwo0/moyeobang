package com.ssafy.moyeobang.member.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.member.adapter.out.persistence.MemberRepositoryInMemberInfo;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.out.LoadMemberInfoPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberInfoAdapter implements LoadMemberInfoPort {

    private final MemberRepositoryInMemberInfo memberRepository;

    @Override
    public MemberInfo loadMemberInfo(Long id) {

        MemberJpaEntity findMemberEntity = findById(id);

        return
    }

    private MemberJpaEntity findById(Long id) {

        return memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 해당하는 회원 정보가 없습니다."));
    }
}
