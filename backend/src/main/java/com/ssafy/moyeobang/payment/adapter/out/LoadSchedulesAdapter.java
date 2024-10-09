package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleStatus;
import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.payment.adapter.out.persistence.schedule.ScheduleRepositoryInPayment;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.ScheduleLocation;
import com.ssafy.moyeobang.payment.application.port.out.LoadSchedulesPort;
import com.ssafy.moyeobang.payment.application.port.out.UpdateScheduleTransactionPort;
import com.ssafy.moyeobang.payment.error.ErrorCode;
import com.ssafy.moyeobang.payment.error.PaymentException;
import java.util.List;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadSchedulesAdapter implements LoadSchedulesPort, UpdateScheduleTransactionPort {

    private final ScheduleRepositoryInPayment scheduleRepository;
    private final WithdrawRepositoryInPayment withdrawRepository;

    @Override
    public List<ScheduleLocation> loadSchedules(long travelId) {
        List<ScheduleJpaEntity> schedules = scheduleRepository.findByTravelId(travelId);
        return ScheduleMapper.toDomainList(schedules);
    }

    @Override
    public void updateScheduleStatus(long scheduleId) {
        ScheduleJpaEntity scheduleJpaEntity = scheduleRepository.findById(scheduleId).orElse(null);
        if (scheduleJpaEntity == null) {
            throw new PaymentException(ErrorCode.SCHEDULE_NOT_FOUND);
        }
        scheduleJpaEntity.updateComplete();
    }

    @Override
    public void matchingScheduleTransaction(long scheduleId, long withdrawId) {
        ScheduleJpaEntity scheduleJpaEntity = scheduleRepository.findById(scheduleId).orElse(null);
        WithdrawJpaEntity withdrawJpaEntity = withdrawRepository.findById(withdrawId).orElse(null);
        if (scheduleJpaEntity == null || withdrawJpaEntity == null) {
            throw new PaymentException(ErrorCode.CANT_MATCHING_TRANSACTION);
        }
        scheduleJpaEntity.matchingTransaction(withdrawJpaEntity);
    }

    @Override
    public void createUnmatchingScheduleTransaction(long withdrawId, int lastSequence) {
        WithdrawJpaEntity withdrawJpaEntity = withdrawRepository.findById(withdrawId).orElse(null);
        if (withdrawJpaEntity == null) {
            throw new PaymentException(ErrorCode.WITHDRAW_NOT_FOUND);
        }

        ScheduleJpaEntity scheduleJpaEntity = ScheduleJpaEntity.builder()
                .travel(withdrawJpaEntity.getTravelAccount().getTravel())
                .startDateTime(withdrawJpaEntity.getCreatedAt())
                .complete(ScheduleStatus.COMPLETE)
                .latitude(withdrawJpaEntity.getLatitude())
                .longitude(withdrawJpaEntity.getLongitude())
                .sequence(lastSequence)
                .budget((int) withdrawJpaEntity.getAmount())
                .withdraw(withdrawJpaEntity)
                .build();

        scheduleRepository.save(scheduleJpaEntity);
    }
}
