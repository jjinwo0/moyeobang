package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberTravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberInTravelPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class NotificationTravelAdapter implements LoadMemberInTravelPort {

    private final MemberTravelRepositoryInNotification travelRepository;

    private final MemberMapper memberMapper;

    @Override
    public List<Member> findMemberIdByMemberTravelEntity(Long travelId) {

        return travelRepository.findMemberIdByTravelId(travelId).stream()
                .map(m -> memberMapper.mapToDomain(m))
                .toList();
    }
}
