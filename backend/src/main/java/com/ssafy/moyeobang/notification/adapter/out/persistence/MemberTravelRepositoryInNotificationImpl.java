package com.ssafy.moyeobang.notification.adapter.out.persistence;

import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberTravelJpaEntity.memberTravelJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberTravelJpaEntity;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberTravelRepositoryInNotificationImpl implements MemberTravelRepositoryInNotificationCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Map<Long, List<MemberTravelJpaEntity>> findAllMemberInTravel() {

        return queryFactory
                .selectFrom(memberTravelJpaEntity)
                .where(memberTravelJpaEntity.travel.isNotNull())
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        member -> member.getTravel().getId(),
                        Collectors.toList()));
    }
}
