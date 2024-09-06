package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;
import com.ssafy.moyeobang.settle.application.port.out.FindMemberTravelPort;
import com.ssafy.moyeobang.settle.application.port.out.UpdateMemberTravelPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberTravelPersistenceAdapter implements FindMemberTravelPort, UpdateMemberTravelPort {

    private final MemberTravelRepository memberTravelRepository;

    private final MemberTravelMapper memberTravelMapper;

    @Override
    public MemberTravel findMemberTravel(Long memberId, Long travelId) {

        MemberTravelEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId);

        return memberTravelMapper.mapToDomain(findEntity);
    }

    @Override
    public void addMemberTravelAmount(Integer amount, Long memberId, Long travelId) {

        MemberTravelEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId);

        findEntity.addBalance(amount);
    }

    @Override
    public void decreaseMemberTravelAmount(Integer amount, Long memberId, Long travelId) {

        MemberTravelEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId);

        findEntity.subtractBalance(amount);
    }
}
