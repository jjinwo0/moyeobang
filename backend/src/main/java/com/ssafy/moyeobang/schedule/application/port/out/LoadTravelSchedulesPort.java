package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.domain.Schedule;
import java.util.List;

public interface LoadTravelSchedulesPort {
    List<Schedule> loadSchedulesByTravelId(Long travelId);
}
