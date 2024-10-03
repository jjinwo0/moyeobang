package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberAccountJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberAccountRepositoryInNotification;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class NotificationMemberAdapter implements FCMTokenPort, LoadMemberPort {

    private final MemberRepositoryInNotification memberRepository;
    private final MemberAccountRepositoryInNotification memberAccountRepository;
    private final MemberMapperInNotificaion memberMapper;

    @Override
    public String getToken(String email) {

        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("[" + email + "]의 회원을 찾을 수 없습니다."))
                .getFCMToken();
    }

    @Override
    public boolean hasKey(String email) {

        return memberRepository.findByEmail(email).isPresent();
    }

    @Override
    public void saveFCMToken(Long id, String token) {

        MemberJpaEntity entity = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 회원을 찾을 수 없습니다."));

        entity.saveFCMToken(token);

        memberRepository.save(entity);
    }

    @Override
    public Member findById(Long id) {

        MemberJpaEntity entity = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 회원을 찾을 수 없습니다."));
        return memberMapper.mapToDomain(entity);
    }

    @Override
    public String findAccountNoById(Long id) {

        MemberAccountJpaEntity findAccount = memberAccountRepository.findMemberAccountByMemberId(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 회원 계좌 정보를 찾을 수 없습니다."));

        return findAccount.getAccountNumber();
    }
}
