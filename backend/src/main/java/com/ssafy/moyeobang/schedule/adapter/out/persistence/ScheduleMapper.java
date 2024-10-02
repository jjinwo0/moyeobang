package com.ssafy.moyeobang.schedule.adapter.out.persistence;

import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.ScheduleInfo;
import com.ssafy.moyeobang.schedule.adapter.out.persistence.schedule.WithdrawInfo;
import com.ssafy.moyeobang.schedule.application.domain.Location;
import com.ssafy.moyeobang.schedule.application.domain.Participant;
import com.ssafy.moyeobang.schedule.application.domain.Schedule;
import com.ssafy.moyeobang.schedule.application.domain.Transaction;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ScheduleMapper {

    public List<Schedule> toDomainList(List<ScheduleInfo> scheduleInfos) {
        return scheduleInfos.stream()
                .map(this::toDomain)
                .toList();
    }

    public Schedule toDomain(ScheduleInfo dto) {

        Location location = Location.of(
                dto.getTitle(),
                dto.getAddress(),
                dto.getGooglePlaceId(),
                dto.getLatitude(),
                dto.getLongitude()
        );

        Transaction transaction = null;
        if (dto.getIsMatchedTransaction() && dto.getWithdrawInfo() != null) {
            transaction = mapWithdrawToTransaction(dto.getWithdrawInfo(), dto.getParticipantIds(), true);
        } else if (!dto.getIsMatchedTransaction() && dto.getWithdrawInfo() != null) {
            transaction = mapWithdrawToTransaction(dto.getWithdrawInfo(), dto.getParticipantIds(), false);
        }

        return Schedule.builder()
                .travelId(dto.getTravelId())
                .scheduleId(dto.getScheduleId())
                .title(dto.getScheduleTitle())
                .scheduleStartTime(dto.getStartDateTime())
                .budget(dto.getBudget())
                .completion(dto.getComplete())
                .imageUrl(dto.getImageUrl())
                .memo(dto.getMemo())
                .sequence(dto.getSequence())
                .location(location)
                .transaction(transaction)
                .build();
    }

    private Transaction mapWithdrawToTransaction(WithdrawInfo withdraw, List<Long> participantIds, boolean isMatched) {
        List<Participant> participants = participantIds.stream()
                .map(Participant::of)
                .toList();

        return Transaction.create(
                withdraw.getWithdrawId(),
                withdraw.getWithdrawTitle(),
                withdraw.getCreatedAt(),
                withdraw.getAmount(),
                withdraw.getLatitude(),
                withdraw.getLongitude(),
                withdraw.getPaymentRequestId(),
                withdraw.getSettleType(),
                participants,
                isMatched
        );
    }
}
