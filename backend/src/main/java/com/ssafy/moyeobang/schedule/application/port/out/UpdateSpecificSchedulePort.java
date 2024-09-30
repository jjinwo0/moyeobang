package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.port.in.UpdateTravelScheduleCommand;

public interface UpdateSpecificSchedulePort {
    void updateSpecificSchedule(UpdateTravelScheduleCommand command);
}
