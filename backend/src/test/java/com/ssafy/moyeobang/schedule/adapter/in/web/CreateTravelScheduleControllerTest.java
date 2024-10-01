package com.ssafy.moyeobang.schedule.adapter.in.web;

import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.schedule.adapter.in.web.request.CreateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.LocationInfo;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;


public class CreateTravelScheduleControllerTest extends WebAdapterTestSupport {
    @MockBean
    private CreateTravelScheduleUseCase createTravelScheduleUseCase;

    @DisplayName("새로운 여행 스케줄을 생성하면 성공 여부를 반환한다.")
    @Test
    void createTravelSchedule() throws Exception {
        // Given
        CreateTravelScheduleRequest request = new CreateTravelScheduleRequest(
                "두열킹과 함께하는 코딩 여행",
                new LocationInfo("ChIJ1x9-lADvYjURbMl_CjjFXjg", "엔젤리너스 카페", "한국 광주 수완지구", 35.6586, 139.7454,
                        "카페"),
                LocalDateTime.of(2024, 10, 1, 10, 0),
                "기대기대",
                "https://example.com/tokyo_tower.jpg"
        );

        // When
        willDoNothing().given(createTravelScheduleUseCase)
                .createTravelSchedule(any(CreateTravelScheduleCommand.class));

        // Then
        mockMvc.perform(
                        post("/api/travel/{travelId}/schedule", 1L)
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.error").value(nullValue()));
    }
}
