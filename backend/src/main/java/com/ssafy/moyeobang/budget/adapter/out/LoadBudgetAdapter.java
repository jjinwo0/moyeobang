package com.ssafy.moyeobang.budget.adapter.out;

import com.ssafy.moyeobang.budget.application.domain.Budget;
import com.ssafy.moyeobang.budget.application.port.out.LoadBudgetPort;
import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.schedule.ScheduleJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.travel.TravelJpaEntity;
import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class LoadBudgetAdapter implements LoadBudgetPort {

    private final ScheduleRepositoryInBudget scheduleRepository;
    private final PaymentHistoryRepository paymentHistoryRepository;

    @Override
    public Budget loadBudget(Long scheduleId) {
        ScheduleJpaEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow();

        TravelJpaEntity travel = schedule.getTravel();

        List<MemberJpaEntity> memberJpaEntities = travel.getMemberTravelJpaEntities().stream()
                .map(MemberTravelJpaEntity::getMember)
                .toList();

        List<Member> members = memberJpaEntities.stream()
                .map(member -> new Member(member.getGender().name(), member.getAge()))
                .toList();

        LongSummaryStatistics stats = paymentHistoryRepository.findBy(schedule.getTitle(), members).stream()
                .map(PaymentHistory::getTotalPrice)
                .collect(Collectors.summarizingLong(Long::longValue));

        if (stats.getCount() == 0) {
            long max = 150 + (long) (Math.random() * 30);
            long min = 120 + (long) (Math.random() * 30);

            return new Budget(max * members.size() * 100, min * members.size() * 100);
        }

        return new Budget(stats.getMax(), stats.getMin());
    }
}
