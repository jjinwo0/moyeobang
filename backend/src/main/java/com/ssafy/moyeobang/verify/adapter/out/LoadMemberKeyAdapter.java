package com.ssafy.moyeobang.verify.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.verify.application.error.MemberEntityNotFoundException;
import com.ssafy.moyeobang.verify.application.port.out.LoadMemberKeyPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadMemberKeyAdapter implements LoadMemberKeyPort {

    private final MemberRepositoryInVerify memberRepository;

    @Override
    public String loadMemberKey(Long id) {

        MemberJpaEntity findMemberEntity = memberRepository.findById(id)
                .orElseThrow(MemberEntityNotFoundException::new);

        return findMemberEntity.getMemberKey();
    }
}
