package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.port.out.FCMTokenPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class NotificationMemberAdapter implements FCMTokenPort {

    private final MemberRepositoryInNotification memberRepository;

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
}
