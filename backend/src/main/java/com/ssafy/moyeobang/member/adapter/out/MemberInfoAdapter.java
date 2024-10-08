package com.ssafy.moyeobang.member.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.member.adapter.out.persistence.MemberAccountRepositoryInMemberInfo;
import com.ssafy.moyeobang.member.adapter.out.persistence.MemberRepositoryInMemberInfo;
import com.ssafy.moyeobang.member.application.domain.MemberInfo;
import com.ssafy.moyeobang.member.application.port.out.CreateMemberAccountPort;
import com.ssafy.moyeobang.member.application.port.out.LoadMemberInfoPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberInfoAdapter implements LoadMemberInfoPort, CreateMemberAccountPort {

    private final MemberRepositoryInMemberInfo memberRepository;

    private final MemberAccountRepositoryInMemberInfo memberAccountRepository;

    private final MemberInfoMapper mapper;

    @Override
    public MemberInfo loadMemberInfo(Long id) {

        MemberJpaEntity findMemberEntity = findById(id);

        MemberAccountJpaEntity findAccountEntity = findAccountById(id);

        return mapper.mapToDomain(findMemberEntity, findAccountEntity);
    }

    @Override
    public Long createMemberAccount(String accountNo, Long memberId) {

        MemberJpaEntity findMemberEntity = findById(memberId);

        MemberAccountJpaEntity createAccount = MemberAccountJpaEntity.builder()
                .bankName("싸피뱅크")
                .accountNumber(accountNo)
                .member(findMemberEntity)
                .build();

        memberAccountRepository.save(createAccount);

        return createAccount.getId();
    }

    private MemberJpaEntity findById(Long id) {

        return memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 해당하는 회원 정보가 없습니다."));
    }

    private MemberAccountJpaEntity findAccountById(Long id) {

        return memberAccountRepository.findByMemberId(id)
                .orElse(null);
    }
}
