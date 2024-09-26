package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberJpaEntity.memberJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberTravelJpaEntity.memberTravelJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QQuizJpaEntity.quizJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QTravelAccountJpaEntity.travelAccountJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QTravelJpaEntity.travelJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TravelQueryRepositoryImpl implements TravelQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TravelInfo> findTravelInfosBy(Long memberId) {
        return queryFactory.select(travelInfo())
                .from(travelJpaEntity)
                .join(memberTravelJpaEntity).on(memberTravelJpaEntity.travel.eq(travelJpaEntity))
                .join(memberTravelJpaEntity.member, memberJpaEntity)
                .join(quizJpaEntity).on(quizJpaEntity.travel.eq(travelJpaEntity))
                .join(travelAccountJpaEntity).on(travelAccountJpaEntity.travel.eq(travelJpaEntity))
                .where(memberTravelJpaEntity.member.id.eq(memberId))
                .fetch();
    }

    private QTravelInfo travelInfo() {
        return new QTravelInfo(
                travelJpaEntity,
                travelAccountJpaEntity,
                quizJpaEntity
        );
    }
}
