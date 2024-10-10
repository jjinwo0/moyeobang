package com.ssafy.moyeobang.account.adapter.out;

import com.ssafy.moyeobang.account.adapter.out.persistence.account.TravelAccountRepositoryInAccount;
import com.ssafy.moyeobang.account.application.domain.Travel;
import com.ssafy.moyeobang.account.application.port.out.LoadTravelPort;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadTravelAdapterInAccount implements LoadTravelPort {

    private final TravelAccountRepositoryInAccount travelAccountRepository;

    private final TravelMapperInAccount mapper;

    @Override
    public Travel findById(Long id) {

        TravelJpaEntity findEntity = travelAccountRepository.findTravelById(id)
                .orElseThrow(() -> new EntityNotFoundException("[" + id + "] 해당하는 계좌에 연결된 여행 정보를 찾을 수 없습니다."));

        return mapper.mapToDomain(findEntity);
    }
}
