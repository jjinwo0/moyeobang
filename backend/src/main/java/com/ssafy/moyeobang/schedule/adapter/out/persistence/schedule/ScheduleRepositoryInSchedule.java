package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScheduleRepositoryInSchedule extends JpaRepository<ScheduleJpaEntity, Long> {
    Optional<List<ScheduleJpaEntity>> findByTravelId(Long scheduleId);

    @Query("SELECT s FROM ScheduleJpaEntity s " +
            "LEFT JOIN FETCH s.withdraw w " +
            "LEFT JOIN FETCH w.orderJpaEntities o " +
            "LEFT JOIN FETCH o.memberOrderHistoryJpaEntities moh " +
            "WHERE s.travel.id = :travelId " +
            "ORDER BY s.sequence ASC")
    List<ScheduleJpaEntity> findSchedulesByTravelIdAndDate(
            @Param("travelId") Long travelId,
            @Param("date") LocalDate date
    );
}
