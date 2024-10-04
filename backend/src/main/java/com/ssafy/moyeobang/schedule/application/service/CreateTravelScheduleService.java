package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.domain.Location;
import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.CreateTravelScheduleUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.CreateNewSchedulePort;
import com.ssafy.moyeobang.schedule.application.port.out.LoadExistingSchedulesPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class CreateTravelScheduleService implements CreateTravelScheduleUseCase {

    private final LoadExistingSchedulesPort loadExistingSchedulesPort;
    private final CreateNewSchedulePort createNewSchedulePort;

    @Override
    public void createTravelSchedule(CreateTravelScheduleCommand command) {
        List<TravelSchedule> existingSchedules = loadExistingSchedulesPort.loadExistingSchedules(
                command.travelId());

        int lastSequence = existingSchedules.stream()
                .mapToInt(TravelSchedule::getSequence)
                .max()
                .orElse(0);

        Location location = Location.of(command.location().title(), command.location().address(),
                command.location().googlePlaceId(),
                command.location().lat(), command.location().lng(), command.location().category());

        // TODO : 예산 예측 로직 필요
        TravelSchedule newSchedule = TravelSchedule.createNewSchedule(
                command.travelId(),
                command.scheduleTitle(),
                command.scheduleTime(),
                0,
                command.image_url(),
                command.memo(),
                location,
                lastSequence + 1
        );

        createNewSchedulePort.saveNewSchedule(newSchedule);
    }
}
