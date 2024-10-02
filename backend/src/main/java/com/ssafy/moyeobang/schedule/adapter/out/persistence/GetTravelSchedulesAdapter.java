package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.domain.Schedule;
import com.ssafy.moyeobang.schedule.application.port.out.LoadTravelSchedulesPort;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class GetTravelSchedulesAdapter implements LoadTravelSchedulesPort {

    private final ScheduleRepositoryInSchedule scheduleRepository;
    private final ScheduleMapper scheduleMapper;

    @Override
    public List<Schedule> loadSchedulesByTravelId(Long travelId) {
//        List<ScheduleJpaEntity> entities = scheduleRepository.findSchedulesByTravelId(travelId);
//        return scheduleMapper.toDomainList(entities);
        return null;
    }
}
