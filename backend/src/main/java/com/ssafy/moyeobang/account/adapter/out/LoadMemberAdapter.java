package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberInfo;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadMemberAdapter implements LoadMemberPort {

    private final MemberRepositoryInAccount memberRepository;

    @Override
    public Member loadMember(Long memberId) {
        MemberInfo member = memberRepository.findMemberInfoBy(memberId);

        return new Member(
                member.getId(),
                member.getName(),
                member.getProfileImage(),
                member.getMemberKey(),
                member.getAccountNumber()
        );
    }
}
