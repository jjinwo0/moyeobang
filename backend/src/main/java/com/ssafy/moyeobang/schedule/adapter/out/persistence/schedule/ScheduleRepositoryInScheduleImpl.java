package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moyeobang.common.persistenceentity.schedule.QScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.QWithdrawJpaEntity;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryInScheduleImpl implements ScheduleRepositoryInSchedule {

    private final JPAQueryFactory queryFactory;

    private final QScheduleJpaEntity schedule = QScheduleJpaEntity.scheduleJpaEntity;
    private final QWithdrawJpaEntity withdraw = QWithdrawJpaEntity.withdrawJpaEntity;

    @Override
    public Optional<List<ScheduleJpaEntity>> findByTravelId(Long scheduleId) {
        List<ScheduleJpaEntity> schedules = queryFactory.selectFrom(schedule)
                .leftJoin(schedule.withdraw, withdraw)
                .fetchJoin()
                .where(schedule.id.eq(scheduleId))
                .fetch();
        return Optional.ofNullable(schedules);
    }

    @Override
    public List<Schedule> findSchedulesByTravelId(Long travelId) {
        return queryFactory.select(Projections.constructor(Schedule.class,
                        schedule.id,
                        schedule.scheduleTitle,
                        schedule.startDateTime,
                        schedule.title,
                        schedule.address,
                        schedule.googlePlaceId,
                        schedule.isMatchedTransaction,
                        schedule.budget,
                        schedule.complete,
                        schedule.imageUrl,
                        schedule.memo,
                        schedule.latitude,
                        schedule.longitude,
                        schedule.sequence,
                        schedule.travel.id,
                        withdraw.id,
                        withdraw.title
                ))
                .from(schedule)
                .leftJoin(schedule.withdraw, withdraw)
                .where(schedule.travel.id.eq(travelId))
                .fetch();
    }

    @Override
    public void save(ScheduleJpaEntity scheduleJpaEntity) {

    }

}
