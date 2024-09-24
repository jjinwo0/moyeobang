package com.ssafy.moyeobang.travel.application.service;

import static java.io.InputStream.nullInputStream;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

import com.ssafy.moyeobang.travel.adapter.in.web.out.CreateTravelResponse;
import com.ssafy.moyeobang.travel.application.domain.BackgroundImage;
import com.ssafy.moyeobang.travel.application.port.in.CreateTravelInCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelOutCommand;
import com.ssafy.moyeobang.travel.application.port.out.CreateTravelPort;
import com.ssafy.moyeobang.travel.application.port.out.UploadImagePort;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CreateTravelServiceTest {

    private final UploadImagePort uploadImagePort = mock(UploadImagePort.class);
    private final CreateTravelPort createTravelPort = mock(CreateTravelPort.class);

    private final CreateTravelService createTravelService = new CreateTravelService(uploadImagePort, createTravelPort);

    @DisplayName("입력된 여행 정보를 바탕으로 여행을 생성한다.")
    @Test
    void createTravel() {
        //given
        given(uploadImagePort.uploadImage(any(BackgroundImage.class)))
                .willReturn("https://sample-image.png");

        given(createTravelPort.createTravel(any(CreateTravelOutCommand.class)))
                .willReturn(1L);

        CreateTravelInCommand command = new CreateTravelInCommand(
                "즐거운 제주도 여행",
                LocalDate.now(),
                LocalDate.now().plusDays(1),
                List.of("제주도 서귀포", "부산"),
                "김훈민의 발 사이즈는?",
                "235",
                new BackgroundImage("배경 이미지", "image/png", nullInputStream(), 1024)
        );

        //when
        CreateTravelResponse response = createTravelService.createTravel(command);

        //then
        assertThat(response.travelId()).isEqualTo(1L);
    }
}