package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleSequenceCommand;
import com.ssafy.moyeobang.schedule.application.port.in.UpdateScheduleSequenceUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.UpdateScheduleSequencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class UpdateScheduleSequenceService implements UpdateScheduleSequenceUseCase {

    private final UpdateScheduleSequencePort updateScheduleSequencePort;

    @Override
    public void updateScheduleSequence(UpdateScheduleSequenceCommand command) {
        updateScheduleSequencePort.updateSchedules(command.scheduleSequences());
    }
}
