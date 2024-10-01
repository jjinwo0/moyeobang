package com.ssafy.moyeobang.schedule.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.schedule.adapter.in.web.response.DayScheduleResponse;
import com.ssafy.moyeobang.schedule.application.port.in.GetTravelSchedulesUseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class GetTravelSchedulesService implements GetTravelSchedulesUseCase {

    @Override
    public DayScheduleResponse getTravelSchedules(long travelId) {
        return null;
    }
}
