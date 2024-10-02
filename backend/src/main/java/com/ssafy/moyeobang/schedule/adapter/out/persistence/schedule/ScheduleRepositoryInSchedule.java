package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import java.util.List;

public interface ScheduleRepositoryInSchedule {
    List<ScheduleInfo> findSchedulesByTravelId(Long travelId);
}
