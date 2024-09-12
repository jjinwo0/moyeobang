package com.ssafy.moyeobang.account.adapter.out.persistence.order;

import static com.ssafy.moyeobang.common.persistenceentity.order.QOrderJpaEntity.orderJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.travel.QTravelAccountJpaEntity.travelAccountJpaEntity;
import static com.ssafy.moyeobang.common.persistenceentity.withdraw.QWithdrawJpaEntity.withdrawJpaEntity;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrderQueryRepositoryInAccount {

    private final JPAQueryFactory queryFactory;

    public List<OrderJpaEntity> findBy(String accountNumber) {
        return queryFactory.selectFrom(orderJpaEntity)
                .join(orderJpaEntity.withdraw, withdrawJpaEntity)
                .join(withdrawJpaEntity.travelAccount, travelAccountJpaEntity)
                .where(orderJpaEntity.withdraw.travelAccount.accountNumber.eq(accountNumber))
                .fetch();
    }
}
