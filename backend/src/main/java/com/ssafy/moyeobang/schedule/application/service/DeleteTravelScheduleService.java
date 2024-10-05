package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.application.port.in.DeleteTravelScheduleUseCase;
import com.ssafy.moyeobang.schedule.application.port.out.DeleteTravelSchedulePort;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class DeleteTravelScheduleService implements DeleteTravelScheduleUseCase {

    private final DeleteTravelSchedulePort deleteTravelSchedulePort;

    @Override
    public void deleteTravelSchedule(long travelId, long scheduleId) {
        deleteTravelSchedulePort.deleteTravelSchedule(travelId, scheduleId);
    }
}
