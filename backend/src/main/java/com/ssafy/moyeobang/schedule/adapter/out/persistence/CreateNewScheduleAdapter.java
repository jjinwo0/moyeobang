package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.travel.TravelRepositoryInSchedule;
import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;
import com.ssafy.moyeobang.schedule.application.port.out.CreateNewSchedulePort;
import com.ssafy.moyeobang.schedule.application.port.out.LoadExistingSchedulesPort;
import com.ssafy.moyeobang.schedule.error.ErrorCode;
import com.ssafy.moyeobang.schedule.error.ScheduleException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@PersistenceAdapter
@RequiredArgsConstructor
public class CreateNewScheduleAdapter implements CreateNewSchedulePort, LoadExistingSchedulesPort {

    private final ScheduleRepositoryInSchedule scheduleRepository;
    private final TravelScheduleMapper travelScheduleMapper;
    private final TravelRepositoryInSchedule travelRepositoryInSchedule;

    @Override
    public List<TravelSchedule> loadExistingSchedules(long travelId) {
        List<ScheduleJpaEntity> scheduleJpaEntities = scheduleRepository.findByTravelId(travelId)
                .orElseThrow(() -> new ScheduleException(ErrorCode.TRAVEL_SCHEDULE_NOT_FOUND));
        return travelScheduleMapper.toScheduleList(scheduleJpaEntities);
    }

    @Transactional
    @Override
    public void saveNewSchedule(TravelSchedule travelSchedule) {
        TravelJpaEntity travelJpaEntity = travelRepositoryInSchedule.findById(travelSchedule.getTravelId())
                .orElseThrow(() -> new ScheduleException(
                        ErrorCode.TRAVEL_NOT_FOUND));

        ScheduleJpaEntity scheduleJpaEntity = createSchedule(travelSchedule, travelJpaEntity);
        scheduleRepository.save(scheduleJpaEntity);
    }


    private ScheduleJpaEntity createSchedule(TravelSchedule travelSchedule, TravelJpaEntity travelJpaEntity) {
        return ScheduleJpaEntity.builder()
                .title(travelSchedule.getTitle())
                .startDateTime(travelSchedule.getScheduleStartTime())
                .address(travelSchedule.getLocation().getAddress())
                .googlePlaceId(travelSchedule.getLocation().getGooglePlaceId())
                .budget(travelSchedule.getBudget())
                .complete(travelSchedule.getCompletion())
                .imageUrl(travelSchedule.getImageUrl())
                .memo(travelSchedule.getMemo())
                .latitude(travelSchedule.getLocation().getLatitude())
                .longitude(travelSchedule.getLocation().getLongitude())
                .sequence(travelSchedule.getSequence())
                .travel(travelJpaEntity)
                .build();
    }
}
