package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import static com.ssafy.moyeobang.common.persistenceentity.schedule.QScheduleJpaEntity.scheduleJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.withdraw.QWithdrawJpaEntity.withdrawJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryInScheduleImpl implements ScheduleRepositoryInSchedule {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ScheduleInfo> findSchedulesByTravelId(Long travelId) {
        return queryFactory.select(scheduleInfo())
                .from(scheduleJpaEntity)
                .leftJoin(scheduleJpaEntity.withdraw, withdrawJpaEntity)
                .fetchJoin()
                .where(scheduleJpaEntity.travel.id.eq(travelId))
                .fetch();
    }

    private QScheduleInfo scheduleInfo() {
        return new QScheduleInfo(
                scheduleJpaEntity,
                withdrawJpaEntity
        );
    }

}
