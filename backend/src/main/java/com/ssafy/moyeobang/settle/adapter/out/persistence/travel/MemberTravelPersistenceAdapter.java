package com.ssafy.moyeobang.settle.adapter.out.persistence.travel;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.travel.MemberTravel;
import com.ssafy.moyeobang.settle.application.port.out.FindMemberTravelPort;
import com.ssafy.moyeobang.settle.application.port.out.UpdateMemberTravelPort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberTravelPersistenceAdapter implements FindMemberTravelPort, UpdateMemberTravelPort {

    private final MemberTravelRepositoryInSettle memberTravelRepository;

    private final MemberTravelMapper memberTravelMapper;

    @Override
    public MemberTravel findMemberTravel(Long memberId, Long travelId) {

        MemberTravelJpaEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Member[" + memberId + "]이 참여한 여행 [" + travelId + "]의 정보가 없습니다."));

        return memberTravelMapper.mapToDomain(findEntity);
    }

    @Override
    @Transactional
    public void addMemberTravelAmount(Integer amount, Long memberId, Long travelId) {

        MemberTravelJpaEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Member[" + memberId + "]이 참여한 여행 [" + travelId + "]의 정보가 없습니다."));

        findEntity.addBalance(amount);
    }

    @Override
    @Transactional
    public void decreaseMemberTravelAmount(Integer amount, Long memberId, Long travelId) {

        MemberTravelJpaEntity findEntity = memberTravelRepository.findByMemberIdAndTravelId(memberId, travelId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Member[" + memberId + "]이 참여한 여행 [" + travelId + "]의 정보가 없습니다."));

        findEntity.subtractBalance(amount);
    }
}
