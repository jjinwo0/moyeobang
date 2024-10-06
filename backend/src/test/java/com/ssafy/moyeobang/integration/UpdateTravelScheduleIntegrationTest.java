package com.ssafy.moyeobang.integration;

import static com.ssafy.moyeobang.integration.RestClientUtils.put;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.LocationInfo;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.UpdateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.travel.TravelRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.error.ErrorCode;
import com.ssafy.moyeobang.schedule.error.ScheduleException;
import com.ssafy.moyeobang.support.IntegrationTestSupport;
import java.time.LocalDateTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

@Disabled
public class UpdateTravelScheduleIntegrationTest extends IntegrationTestSupport {

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

    @DisplayName("스케줄 업데이트 통합 테스트")
    @Test
    void testUpdateTravelSchedule() throws JsonProcessingException {
        // Given
        TravelJpaEntity travel = createTravel();
        ScheduleJpaEntity scheduleJpaEntity = createScheduleJpaEntity(travel, "첫 번째 스케줄", "엔젤리너스 카페", 1);

        scheduleRepository.save(scheduleJpaEntity);

        UpdateTravelScheduleRequest request = new UpdateTravelScheduleRequest(
                "수정된 코딩 여행",
                new LocationInfo(
                        "ChIJ1x9-lADvYjURbMl_CjjFXjg",
                        "수정된 엔젤리너스 카페",
                        "한국 광주 수완지구",
                        35.6586,
                        139.7454,
                        "카페"
                ),
                LocalDateTime.of(2024, 11, 1, 10, 0),
                "수정된 메모",
                "https://example.com/updated_image.jpg"
        );

        String jsonRequest = objectMapper.writeValueAsString(request);

        // When
        JsonNode response = put(port, "/api/travel/" + travel.getId() + "/schedule/" + scheduleJpaEntity.getId(),
                jsonRequest);

        // Then
        assertThat(response.path("status").asText()).isEqualTo("SUCCESS");

        ScheduleJpaEntity updatedSchedule = scheduleRepository.findById(scheduleJpaEntity.getId())
                .orElseThrow(() -> new ScheduleException(ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));

        assertThat(updatedSchedule.getScheduleTitle()).isEqualTo("수정된 코딩 여행");
        assertThat(updatedSchedule.getTitle()).isEqualTo("수정된 엔젤리너스 카페");
        assertThat(updatedSchedule.getAddress()).isEqualTo("한국 광주 수완지구");
        assertThat(updatedSchedule.getLatitude()).isEqualTo(35.6586);
        assertThat(updatedSchedule.getLongitude()).isEqualTo(139.7454);
        assertThat(updatedSchedule.getGooglePlaceId()).isEqualTo("ChIJ1x9-lADvYjURbMl_CjjFXjg");
        assertThat(updatedSchedule.getMemo()).isEqualTo("수정된 메모");
        assertThat(updatedSchedule.getImageUrl()).isEqualTo("https://example.com/updated_image.jpg");
    }

    private TravelJpaEntity createTravel() {
        TravelJpaEntity travel = TravelJpaEntity.builder()
                .title("도쿄 여행")
                .build();
        return travelRepository.save(travel);
    }

    private ScheduleJpaEntity createScheduleJpaEntity(TravelJpaEntity travel, String scheduleTitle, String title,
                                                      int sequence) {
        return ScheduleJpaEntity.builder()
                .scheduleTitle(scheduleTitle)
                .title(title)
                .startDateTime(LocalDateTime.of(2024, 10, 1, 10, 0))
                .address("한국 광주 수완지구")
                .budget(10000)
                .complete(ScheduleStatus.INCOMPLETE)
                .imageUrl("https://example.com/image.jpg")
                .memo("첫 번째 스케줄 메모")
                .latitude(35.6586)
                .longitude(139.7454)
                .googlePlaceId("ChIJ1x9-lADvYjURbMl_CjjFXjg")
                .sequence(sequence)
                .travel(travel)
                .build();
    }
}
