package com.ssafy.moyeobang.schedule.application.port.in;

public interface DeleteTravelScheduleUseCase {
    void deleteTravelSchedule(long travelId, long scheduleId);
}
