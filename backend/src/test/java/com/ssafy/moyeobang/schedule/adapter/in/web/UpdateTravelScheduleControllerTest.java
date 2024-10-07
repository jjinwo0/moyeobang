package com.ssafy.moyeobang.schedule.adapter.in.web;


import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.schedule.adapter.in.web.request.LocationInfo;
import com.ssafy.moyeobang.schedule.adapter.in.web.request.UpdateTravelScheduleRequest;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;

public class UpdateTravelScheduleControllerTest extends WebAdapterTestSupport {
    @MockBean
    private UpdateTravelScheduleUseCase updateTravelScheduleUseCase;

    @DisplayName("기존 여행 스케줄을 업데이트하면 성공 여부를 반환한다.")
    @Test
    void updateTravelSchedule() throws Exception {
        // Given
        UpdateTravelScheduleRequest request = new UpdateTravelScheduleRequest(
                "수정된 코딩 여행",
                new LocationInfo("ChIJ1x9-lADvYjURbMl_CjjFXjg", "새로운 카페", "한국 광주 수완지구", 35.6586, 139.7454, "카페"),
                LocalDateTime.of(2024, 11, 1, 12, 0),
                "수정된 메모"
        );

        MockMultipartFile imageFile = null;

        // When
        willDoNothing().given(updateTravelScheduleUseCase)
                .updateTravelSchedule(any(UpdateTravelScheduleCommand.class));

        // Then
        mockMvc.perform(
                        multipart("/api/travel/{travelId}/schedule/{scheduleId}", 1L, 1L)
                                .file(new MockMultipartFile("data", "", "application/json",
                                        objectMapper.writeValueAsBytes(request)))
                                .file(new MockMultipartFile("image", "", "application/octet-stream", new byte[0]))
                                .contentType("multipart/form-data")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.error").value(nullValue()));
    }
}
