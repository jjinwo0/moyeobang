package com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moyeobang.common.persistenceentity.member.QMemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.QOrderJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.QScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.QWithdrawJpaEntity;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ScheduleRepositoryInScheduleImpl implements ScheduleRepositoryInSchedule {

    private final JPAQueryFactory queryFactory;

    private final QScheduleJpaEntity schedule = QScheduleJpaEntity.scheduleJpaEntity;
    private final QWithdrawJpaEntity withdraw = QWithdrawJpaEntity.withdrawJpaEntity;
    private final QOrderJpaEntity order = QOrderJpaEntity.orderJpaEntity;
    private final QMemberOrderHistoryJpaEntity history = QMemberOrderHistoryJpaEntity.memberOrderHistoryJpaEntity;


    @Override
    public List<ScheduleInfo> findSchedulesByTravelId(Long travelId) {
        List<Tuple> tuples = queryFactory
                .select(
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
                        withdraw.title,
                        withdraw.createdAt,
                        withdraw.amount,
                        withdraw.latitude,
                        withdraw.longitude,
                        withdraw.paymentRequestId,
                        withdraw.settleType,
                        history.member.id
                )
                .from(schedule)
                .leftJoin(schedule.withdraw, withdraw)
                .leftJoin(withdraw.orderJpaEntities, order)
                .leftJoin(order.memberOrderHistoryJpaEntities, history)
                .where(schedule.travel.id.eq(travelId))
                .fetch();

        Map<Long, ScheduleInfo> scheduleMap = new HashMap<>();

        for (Tuple tuple : tuples) {
            Long scheduleId = tuple.get(schedule.id);
            ScheduleInfo info = scheduleMap.get(scheduleId);
            if (info == null) {
                WithdrawInfo withdrawInfo = new WithdrawInfo(
                        tuple.get(withdraw.id),
                        tuple.get(withdraw.title),
                        tuple.get(withdraw.createdAt),
                        tuple.get(withdraw.amount),
                        tuple.get(withdraw.latitude),
                        tuple.get(withdraw.longitude),
                        tuple.get(withdraw.paymentRequestId),
                        tuple.get(withdraw.settleType)
                );
                info = new ScheduleInfo(
                        scheduleId,
                        tuple.get(schedule.scheduleTitle),
                        tuple.get(schedule.startDateTime),
                        tuple.get(schedule.title),
                        tuple.get(schedule.address),
                        tuple.get(schedule.googlePlaceId),
                        tuple.get(schedule.isMatchedTransaction),
                        tuple.get(schedule.budget),
                        tuple.get(schedule.complete),
                        tuple.get(schedule.imageUrl),
                        tuple.get(schedule.memo),
                        tuple.get(schedule.latitude),
                        tuple.get(schedule.longitude),
                        tuple.get(schedule.sequence),
                        tuple.get(schedule.travel.id),
                        withdrawInfo,
                        new ArrayList<>()
                );
                scheduleMap.put(scheduleId, info);
            }
            Long memberId = tuple.get(history.member.id);
            if (memberId != null && !info.getParticipantIds().contains(memberId)) {
                info.getParticipantIds().add(memberId);
            }
        }

        return new ArrayList<>(scheduleMap.values());
    }

}
