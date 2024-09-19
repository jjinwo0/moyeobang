package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.account.error.MemberNotFoundException;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.persistence.member.MemberRepositoryInPayment;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadMemberAdapter implements LoadMemberPort {

    private final MemberRepositoryInPayment memberRepository;

    @Override
    public Member loadMember(Long memberId) {
        MemberJpaEntity member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        return new Member(member.getMemberKey());
    }
}
