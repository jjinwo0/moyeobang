package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.schedule.application.domain.Location;
import com.ssafy.moyeobang.schedule.application.domain.Participant;
import com.ssafy.moyeobang.schedule.application.domain.Schedule;
import com.ssafy.moyeobang.schedule.application.domain.Transaction;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ScheduleMapper {

    public List<Schedule> toDomainList(List<ScheduleJpaEntity> entities) {
        return entities.stream()
                .map(this::toDomain)
                .toList();
    }

    public Schedule toDomain(ScheduleJpaEntity entity) {

        Location location = Location.of(
                entity.getTitle(),
                entity.getAddress(),
                entity.getGooglePlaceId(),
                entity.getLatitude(),
                entity.getLongitude()
        );

        Transaction transaction = null;
        if (entity.isMatchedTransaction() && entity.getWithdraw() != null) {
            transaction = mapWithdrawToTransaction(entity.getWithdraw(), true);
        } else if (!entity.isMatchedTransaction() && entity.getWithdraw() != null) {
            transaction = mapWithdrawToTransaction(entity.getWithdraw(), false);
        }

        return Schedule.create(
                entity.getTravel().getId(),
                entity.getId(),
                entity.getScheduleTitle(),
                entity.getStartDateTime(),
                entity.getBudget(),
                entity.getComplete(),
                entity.getImageUrl(),
                entity.getMemo(),
                location,
                entity.getSequence(),
                transaction
        );
    }

    private Transaction mapWithdrawToTransaction(WithdrawJpaEntity withdraw, boolean isMatched) {
        List<Participant> participants = withdraw.getOrderJpaEntities().stream()
                .flatMap(order -> order.getMemberOrderHistoryJpaEntities().stream())
                .map(history -> Participant.of(history.getMemberId()))
                .toList();

        return Transaction.create(
                withdraw.getId(),
                withdraw.getTitle(),
                withdraw.getCreatedAt(),
                withdraw.getAmount(),
                withdraw.getPaymentRequestId(),
                withdraw.getSettleType(),
                participants,
                isMatched
        );
    }
}
