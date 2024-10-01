package com.ssafy.moyeobang.schedule.application.port.in;

import com.ssafy.moyeobang.schedule.adapter.in.web.response.DayScheduleResponse;

public interface GetTravelSchedulesUseCase {
    DayScheduleResponse getTravelSchedules(long travelId);
}
