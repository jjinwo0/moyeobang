package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleJpaRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.port.out.DeleteTravelSchedulePort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class DeleteTravelScheduleAdapter implements DeleteTravelSchedulePort {

    private final ScheduleJpaRepositoryInSchedule scheduleRepository;


    @Override
    public void deleteTravelSchedule(long travelId, long scheduleId) {
        scheduleRepository.deleteScheduleByTravelIdAndId(travelId, scheduleId);
    }
}
