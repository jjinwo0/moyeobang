package com.ssafy.moyeobang.notification.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.notification.adapter.out.persistence.MemberTravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.adapter.out.persistence.TravelRepositoryInNotification;
import com.ssafy.moyeobang.notification.application.domain.Member;
import com.ssafy.moyeobang.notification.application.domain.MemberTravel;
import com.ssafy.moyeobang.notification.application.domain.Travel;
import com.ssafy.moyeobang.notification.application.port.out.LoadMemberTravelInfoInTravelPort;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ssafy.moyeobang.notification.application.port.out.LoadTravelPort;
import com.ssafy.moyeobang.notification.error.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class NotificationTravelAdapter implements LoadMemberTravelInfoInTravelPort, LoadTravelPort {

    private final MemberTravelRepositoryInNotification memberTravelRepository;

    private final TravelRepositoryInNotification travelRepository;

    private final MemberMapper memberMapper;

    private final MemberTravelMapper memberTravelMapper;

    private final TravelMapper travelMapper;

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

    @Override
    public Travel findById(Long id) {

        TravelJpaEntity findEntity = travelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 해당하는 여행 정보가 없습니다."));

        return travelMapper.mapToDomain(findEntity);
    }
}
