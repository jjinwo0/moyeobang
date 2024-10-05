package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.delete;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.travel.TravelRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.in.DeleteTravelScheduleUseCase;
import com.ssafy.moyeobang.schedule.error.ErrorCode;
import com.ssafy.moyeobang.schedule.error.ScheduleException;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

public class DeleteTravelScheduleIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private ScheduleJpaRepositoryInSchedule scheduleRepository;

    @Autowired
    private TravelRepositoryInSchedule travelRepository;

    @Autowired
    private DeleteTravelScheduleUseCase deleteTravelScheduleUseCase;


    @AfterEach
    void tearDown() {
        scheduleRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("스케줄 삭제 통합 테스트")
    @Test
    void testDeleteTravelSchedule() throws Exception {
        // Given
        TravelJpaEntity travel = createTravel();
        ScheduleJpaEntity schedule1 = createScheduleJpaEntity(travel, "첫 번째 스케줄", 1);
        ScheduleJpaEntity schedule2 = createScheduleJpaEntity(travel, "두 번째 스케줄", 2);

        scheduleRepository.save(schedule1);
        scheduleRepository.save(schedule2);

        // When
        JsonNode response = delete(port, "/api/travel/schedule/" + schedule2.getId());

        // Then
        boolean scheduleExists = scheduleRepository.existsById(schedule2.getId());
        assertThat(scheduleExists).isFalse();

        List<ScheduleJpaEntity> remainingSchedules = scheduleRepository.findByTravelId(travel.getId())
                .orElseThrow(() -> new ScheduleException(
                        ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));
        assertThat(remainingSchedules.size()).isEqualTo(1);
        assertThat(remainingSchedules.get(0).getTitle()).isEqualTo("첫 번째 스케줄");
    }


    private TravelJpaEntity createTravel() {
        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("서울 여행")
                .build();
        return travelRepository.save(travel);
    }

    private ScheduleJpaEntity createScheduleJpaEntity(TravelJpaEntity travel, String title, int sequence) {
        return ScheduleJpaEntity.builder()
                .title(title)
                .startDateTime(LocalDateTime.now())
                .sequence(sequence)
                .travel(travel)
                .build();
    }
}
