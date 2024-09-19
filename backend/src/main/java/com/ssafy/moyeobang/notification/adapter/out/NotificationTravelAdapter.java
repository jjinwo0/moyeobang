package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberTravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.adapter.out.persistence.TravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberTravelInfoInTravelPort;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class NotificationTravelAdapter implements LoadMemberTravelInfoInTravelPort {

    private final MemberTravelRepositoryInNotification memberTravelRepository;

    private final TravelRepositoryInNotification travelRepository;

    private final MemberMapper memberMapper;

    private final MemberTravelMapper memberTravelMapper;

    @Override
    public List<Member> findMemberIdByMemberTravelEntity(Long travelId) {

        return memberTravelRepository.findMemberEntityByTravelId(travelId).stream()
                .map(memberMapper::mapToDomain)
                .toList();
    }

    @Override
    public Map<Long, List<MemberTravel>> findAllMemberInTravel() {

        return memberTravelRepository.findAllMemberInTravel().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream()
                                .map(memberTravelMapper::mapToDomain)
                                .collect(Collectors.toList())
                ));
    }
}
