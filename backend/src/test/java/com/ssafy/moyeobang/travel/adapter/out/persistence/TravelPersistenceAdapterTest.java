package com.ssafy.moyeobang.travel.adapter.out.persistence;

import static java.time.LocalDate.now;
import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.support.PersistenceAdapterTestSupport;
import com.ssafy.moyeobang.travel.adapter.out.persistence.travel.TravelPersistenceAdapter;
import com.ssafy.moyeobang.travel.adapter.out.persistence.travel.TravelPlaceRepositoryInTravel;
import com.ssafy.moyeobang.travel.adapter.out.persistence.travel.TravelRepositoryInTravel;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class TravelPersistenceAdapterTest extends PersistenceAdapterTestSupport {

    @Autowired
    private TravelPersistenceAdapter travelPersistenceAdapter;

    @Autowired
    private TravelRepositoryInTravel travelRepository;

    @Autowired
    private TravelPlaceRepositoryInTravel travelPlaceRepository;

    @AfterEach
    void tearDown() {
        travelPlaceRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("여행 제목, 여행 시작일, 여행 종료일을 바탕으로 여행을 생성한다.")
    @Test
    void createTravel() {
        //given
        LocalDate startDate = now();
        LocalDate endDate = now().plusDays(1);

        CreateTravelOutCommand command = new CreateTravelOutCommand(
                "즐거운 제주도 여행",
                startDate,
                endDate,
                List.of("강원도 춘천", "제주도", "경상남도 함양"),
                "김훈민의 발 사이즈는?",
                "270",
                "https://sample-image.png"
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