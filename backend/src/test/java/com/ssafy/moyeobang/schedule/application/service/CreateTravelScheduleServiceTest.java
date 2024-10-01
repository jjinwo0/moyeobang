package com.ssafy.moyeobang.schedule.application.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ssafy.moyeobang.schedule.application.domain.Location;
import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.LocationInfoCommand;
import com.ssafy.moyeobang.schedule.application.port.out.CreateNewSchedulePort;
import com.ssafy.moyeobang.schedule.application.port.out.LoadExistingSchedulesPort;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class CreateTravelScheduleServiceTest {
    private final LoadExistingSchedulesPort loadExistingSchedulesPort = mock(LoadExistingSchedulesPort.class);
    private final CreateNewSchedulePort createNewSchedulePort = mock(CreateNewSchedulePort.class);

    private final CreateTravelScheduleService createTravelScheduleService = new CreateTravelScheduleService(
            loadExistingSchedulesPort, createNewSchedulePort);

    @DisplayName("새로운 스케줄이 마지막 시퀀스보다 1 증가된 값으로 생성된다.")
    @Test
    void createNewScheduleWithCorrectSequence() {
        // Given
        CreateTravelScheduleCommand command = new CreateTravelScheduleCommand(
                1L,
                "진우바오와 함께하는 야구장",
                new LocationInfoCommand("ChIJ1x9-lADvYjURbMl_CjjFXjg", "엔젤리너스 카페", "한국 광주 수완지구", 35.6586, 139.7454,
                        "카페"), LocalDateTime.of(2024, 10, 1, 10, 0),
                "도쿄 타워 방문 스케줄",
                "https://example.com/tokyo_tower.jpg"
        );

        List<TravelSchedule> existingSchedules = new ArrayList<>();
        existingSchedules.add(TravelSchedule.createNewSchedule(
                2L,
                "훈민이집 가기",
                LocalDateTime.of(2024, 9, 25, 10, 0),
                0,
                null,
                null,
                new Location("화순여행", "화순", "ChIJ1x9-lADvYjURbMl_CjjFXjAS", 35.0, 139.0),
                1
        ));

        when(loadExistingSchedulesPort.loadExistingSchedules(any(Long.class)))
                .thenReturn(existingSchedules);

        // When
        createTravelScheduleService.createTravelSchedule(command);

        // Then
        verify(createNewSchedulePort).saveNewSchedule(any(TravelSchedule.class));
    }

    @DisplayName("새로운 스케줄이 첫 번째 시퀀스로 생성된다.")
    @Test
    void createNewScheduleAsFirst() {
        // Given
        CreateTravelScheduleCommand command = new CreateTravelScheduleCommand(
                1L,
                "도쿄 타워 방문",
                new LocationInfoCommand("ChIJ1x9-lADvYjURbMl_CjjFXjg", "엔젤리너스 카페", "한국 광주 수완지구", 35.6586, 139.7454,
                        "카페"),
                LocalDateTime.of(2024, 10, 1, 10, 0),
                "도쿄 타워 방문 스케줄",
                "https://example.com/tokyo_tower.jpg"
        );

        when(loadExistingSchedulesPort.loadExistingSchedules(any(Long.class)))
                .thenReturn(new ArrayList<>());

        // When
        createTravelScheduleService.createTravelSchedule(command);

        // Then
        verify(createNewSchedulePort).saveNewSchedule(any(TravelSchedule.class));
    }
}
