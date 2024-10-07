package com.ssafy.moyeobang.schedule.application.port.out;

import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;
import java.util.List;

public interface LoadExistingSchedulesPort {
    List<TravelSchedule> loadExistingSchedules(long travelId);
}
