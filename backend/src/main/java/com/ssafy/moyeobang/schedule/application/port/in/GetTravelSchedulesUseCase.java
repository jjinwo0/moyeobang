package com.ssafy.moyeobang.schedule.application.port.in;

import com.ssafy.moyeobang.schedule.adapter.in.web.response.TravelScheduleResponse;

public interface GetTravelSchedulesUseCase {
    TravelScheduleResponse getTravelSchedules(long travelId);
}
