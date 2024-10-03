package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.payment.application.domain.ScheduleLocation;
import java.util.List;

public class ScheduleMapper {
    public static ScheduleLocation toDomain(ScheduleJpaEntity scheduleJpaEntity) {
        return ScheduleLocation.of(
                scheduleJpaEntity.getId(),
                scheduleJpaEntity.getLatitude(),
                scheduleJpaEntity.getLongitude(),
                scheduleJpaEntity.getSequence(),
                scheduleJpaEntity.getComplete()
        );
    }

    public static List<ScheduleLocation> toDomainList(List<ScheduleJpaEntity> scheduleJpaEntities) {
        return scheduleJpaEntities.stream()
                .map(ScheduleMapper::toDomain)
                .toList();
    }
}
