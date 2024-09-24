package com.ssafy.moyeobang.travel.adapter.out.persistence;

import static java.time.LocalDateTime.now;
import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelCommand;
import java.time.LocalDateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class TravelPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private TravelPersistenceAdapter travelPersistenceAdapter;

    @Autowired
    private TravelRepositoryInTravel travelRepository;

    @AfterEach
    void tearDown() {
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("여행 제목, 여행 시작일, 여행 종료일을 바탕으로 여행을 생성한다.")
    @Test
    void createTravel() {
        //given
        LocalDateTime startDate = now();
        LocalDateTime endDate = now().plusDays(1);

        CreateTravelCommand command = new CreateTravelCommand(
                "즐거운 제주도 여행",
                startDate,
                endDate
        );

        //when
        Long travelId = travelPersistenceAdapter.createTravel(command);

        //then
        assertThat(findTravelBy(travelId)).extracting("startDate", "endDate")
                .containsExactly(startDate, endDate);
    }

    private TravelJpaEntity findTravelBy(Long travelId) {
        return travelRepository.findById(travelId).get();
    }

}