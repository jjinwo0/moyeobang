package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleStateUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleStatePort;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@UseCase
@RequiredArgsConstructor
public class UpdateScheduleStateService implements UpdateScheduleStateUseCase {

    private final UpdateScheduleStatePort updateScheduleStatePort;

    @Override
    public void updateScheduleState(long scheduleId) {
        updateScheduleStatePort.updateScheduleState(scheduleId);
    }
}
