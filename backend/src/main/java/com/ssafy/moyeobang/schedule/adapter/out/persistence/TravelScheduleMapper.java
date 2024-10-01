package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.schedule.application.domain.Location;
import com.ssafy.moyeobang.schedule.application.domain.TravelSchedule;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class TravelScheduleMapper {

    public List<TravelSchedule> toScheduleList(List<ScheduleJpaEntity> entities) {
        return entities.stream()
                .map(this::toNewSchedule)
                .collect(Collectors.toList());
    }

    public TravelSchedule toNewSchedule(ScheduleJpaEntity entity) {
        return TravelSchedule.createNewSchedule(
                entity.getTravel().getId(),
                entity.getTitle(),
                entity.getStartDateTime(),
                entity.getBudget(),
                entity.getImageUrl(), entity.getMemo(), createLocation(entity),
                entity.getSequence());
    }

    private Location createLocation(ScheduleJpaEntity entity) {
        return Location.of(entity.getAddress(), entity.getGooglePlaceId(), entity.getLatitude(), entity.getLongitude());
    }

}
