package com.ssafy.moyeobang.travel.adapter.out.persistence.travel;

import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberJpaEntity.memberJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberTravelJpaEntity.memberTravelJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QQuizJpaEntity.quizJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QTravelAccountJpaEntity.travelAccountJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QTravelJpaEntity.travelJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TravelQueryRepositoryImpl implements TravelQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<TravelInfo> findTravelInfosBy(Long memberId) {
        return queryFactory.select(travelInfo())
                .from(memberTravelJpaEntity)
                .join(memberTravelJpaEntity.member, memberJpaEntity)
                .join(memberTravelJpaEntity.travel, travelJpaEntity)
                .join(travelAccountJpaEntity).on(travelAccountJpaEntity.travel.eq(travelJpaEntity))
                .join(quizJpaEntity).on(quizJpaEntity.travel.eq(travelJpaEntity))
                .where(memberTravelJpaEntity.member.id.eq(memberId))
                .fetch();
    }

    @Override
    public Optional<TravelInfo> findTravelInfoBy(Long id) {
        TravelInfo travelInfo = queryFactory.select(travelInfo())
                .from(memberTravelJpaEntity)
                .join(memberTravelJpaEntity.member, memberJpaEntity)
                .join(memberTravelJpaEntity.travel, travelJpaEntity)
                .join(travelAccountJpaEntity).on(travelAccountJpaEntity.travel.eq(travelJpaEntity))
                .join(quizJpaEntity).on(quizJpaEntity.travel.eq(travelJpaEntity))
                .distinct()
                .where(memberTravelJpaEntity.travel.id.eq(id))
                .fetchOne();

        return Optional.ofNullable(travelInfo);
    }

    private QTravelInfo travelInfo() {
        return new QTravelInfo(
                travelJpaEntity,
                travelAccountJpaEntity,
                quizJpaEntity
        );
    }
}
