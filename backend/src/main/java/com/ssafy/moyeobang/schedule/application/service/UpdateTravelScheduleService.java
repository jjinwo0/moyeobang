package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateSpecificSchedulePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class UpdateTravelScheduleService implements UpdateTravelScheduleUseCase {

    private final UpdateSpecificSchedulePort updateSpecificSchedulePort;

    @Override
    public void updateTravelSchedule(UpdateTravelScheduleCommand command) {
        updateSpecificSchedulePort.updateSpecificSchedule(command);
    }
}
