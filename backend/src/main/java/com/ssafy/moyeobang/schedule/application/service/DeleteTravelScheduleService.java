package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.DeleteTravelScheduleUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.DeleteTravelSchedulePort;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class DeleteTravelScheduleService implements DeleteTravelScheduleUseCase {

    private final DeleteTravelSchedulePort deleteTravelSchedulePort;

    @Override
    public void deleteTravelSchedule(long scheduleId) {
        deleteTravelSchedulePort.deleteTravelSchedule(scheduleId);
    }
}
