package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;

public interface CreateNewSchedulePort {
    void saveNewSchedule(TravelSchedule travelSchedule);
}
