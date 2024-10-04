package com.ssafy.moyeobang.payment.application.port.out;

import com.ssafy.moyeobang.payment.application.domain.ScheduleLocation;
import java.util.List;

public interface LoadSchedulesPort {
    List<ScheduleLocation> loadSchedules(long travelId);
}
