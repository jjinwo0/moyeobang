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
import java.util.OptionalDouble;
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

        long budget = (long) paymentHistoryRepository.findBy(schedule.getTitle(), members).stream()
                .mapToLong(PaymentHistory::getTotalPrice)
                .average()
                .orElse(((100 + (long) (Math.random() * 100)) * members.size()) * 100);

        return new Budget(budget);
    }
}
