package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.post;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.CreateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.LocationInfo;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.travel.TravelRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.out.CreateNewSchedulePort;
import com.ssafy.moyeobang.schedule.application.port.out.LoadExistingSchedulesPort;
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


public class CreateTravelScheduleIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    private int port;

    @Autowired
    private ScheduleRepositoryInSchedule scheduleRepository;

    @Autowired
    private TravelRepositoryInSchedule travelRepository;

    @Autowired
    private CreateNewSchedulePort createNewSchedulePort;

    @Autowired
    private LoadExistingSchedulesPort loadExistingSchedulesPort;

    @AfterEach
    void tearDown() {
        scheduleRepository.deleteAllInBatch();
    }

    @DisplayName("스케줄 생성 통합 테스트")
    @Test
    void testCreateNewSchedule() throws JsonProcessingException {
        // Given
        TravelJpaEntity travel = createTravel();
        ScheduleJpaEntity scheduleJpaEntity = createScheduleJpaEntity(travel, "첫 번째 스케줄", 1);

        scheduleRepository.save(scheduleJpaEntity);

        CreateTravelScheduleRequest request = new CreateTravelScheduleRequest(
                "두열킹과 함께하는 코딩 여행",
                new LocationInfo(
                        "ChIJ1x9-lADvYjURbMl_CjjFXjg",
                        "엔젤리너스 카페",
                        "한국 광주 수완지구",
                        35.6586,
                        139.7454,
                        "카페"
                ),
                LocalDateTime.of(2024, 10, 1, 10, 0),
                "기대기대",
                "https://example.com/tokyo_tower.jpg"
        );

        String jsonRequest = objectMapper.writeValueAsString(request);

        // When
        JsonNode response = post(port, "/api/travel/" + travel.getId() + "/schedule", jsonRequest);

        // Then
        assertThat(response.path("status").asText()).isEqualTo("SUCCESS");
        List<ScheduleJpaEntity> savedSchedules = scheduleRepository.findByTravelId(travel.getId())
                .orElseThrow(() -> new ScheduleException(
                        ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));
        savedSchedules.forEach(schedule -> System.out.println("Saved schedule: " + schedule.getTitle()));
        assertThat(savedSchedules.size()).isEqualTo(2);
        assertThat(savedSchedules.get(1).getSequence()).isEqualTo(2);
    }

    private TravelJpaEntity createTravel() {
        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("도쿄 여행")
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
