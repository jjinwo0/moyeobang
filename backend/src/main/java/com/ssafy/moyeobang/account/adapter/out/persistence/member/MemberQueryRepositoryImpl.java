package com.ssafy.moyeobang.account.adapter.out.persistence.member;

import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberAccountJpaEntity.memberAccountJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberJpaEntity.memberJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.member.QMemberTravelJpaEntity.memberTravelJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MemberInfo> findMembersBy(Long travelId) {
        return queryFactory.select(memberInfo())
                .from(memberJpaEntity)
                .join(memberAccountJpaEntity).on(memberAccountJpaEntity.member.eq(memberJpaEntity))
                .join(memberTravelJpaEntity).on(memberTravelJpaEntity.member.eq(memberJpaEntity))
                .fetchJoin()
                .where(memberTravelJpaEntity.travel.id.eq(travelId))
                .fetch();
    }

    private QMemberInfo memberInfo() {
        return new QMemberInfo(
                memberJpaEntity.id,
                memberJpaEntity.username,
                memberJpaEntity.profile,
                memberJpaEntity.memberKey,
                memberAccountJpaEntity.accountNumber
        );
    }
}
