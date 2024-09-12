package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.persistence.account.MemberAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.adapter.out.persistence.member.MemberRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Member;
import com.ssafy.moyeobang.account.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.account.error.AccountNotFoundException;
import com.ssafy.moyeobang.account.error.MemberNotFoundException;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadMemberAdapter implements LoadMemberPort {

    private final MemberRepositoryInAccount memberRepository;
    private final MemberAccountRepositoryInAccount memberAccountRepository;

    @Override
    public Member loadMember(Long memberId) {
        MemberJpaEntity member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        MemberAccountJpaEntity memberAccount = memberAccountRepository.findByMemberId(memberId)
                .orElseThrow(AccountNotFoundException::new);

        return new Member(
                member.getId(),
                member.getUsername(),
                member.getProfile(),
                member.getMemberKey(),
                memberAccount.getAccountNumber()
        );
    }
}
