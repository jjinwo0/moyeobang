package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.patch;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.travel.TravelRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.error.ErrorCode;
import com.ssafy.moyeobang.schedule.error.ScheduleException;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import java.time.LocalDateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

public class UpdateScheduleStateIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private ScheduleJpaRepositoryInSchedule scheduleRepository;

    @Autowired
    private TravelRepositoryInSchedule travelRepository;

    @AfterEach
    void tearDown() {
        scheduleRepository.deleteAllInBatch();
        travelRepository.deleteAllInBatch();
    }

    @DisplayName("스케줄 상태 업데이트 통합 테스트")
    @Test
    void testUpdateScheduleState() throws Exception {
        // Given
        TravelJpaEntity travel = createTravel();
        ScheduleJpaEntity schedule = createScheduleJpaEntity(travel, "첫 번째 스케줄", 1, ScheduleStatus.INCOMPLETE);

        scheduleRepository.save(schedule);

        // When
        JsonNode response = patch(port, "/api/travel/schedule/" + schedule.getId() + "/complete");

        // Then
        ScheduleJpaEntity updatedSchedule = scheduleRepository.findById(schedule.getId())
                .orElseThrow(() -> new ScheduleException(ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));

        assertThat(updatedSchedule.getComplete()).isEqualTo(ScheduleStatus.COMPLETE);
    }

    private TravelJpaEntity createTravel() {
        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("서울 여행")
                .build();
        return travelRepository.save(travel);
    }

    private ScheduleJpaEntity createScheduleJpaEntity(TravelJpaEntity travel, String title, int sequence,
                                                      ScheduleStatus status) {
        return ScheduleJpaEntity.builder()
                .title(title)
                .startDateTime(LocalDateTime.now())
                .sequence(sequence)
                .complete(status)
                .travel(travel)
                .build();
    }
}
