package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberOrderHistoryMapper {

    MemberOrderHistory mapToDomain(final MemberOrderHistoryJpaEntity memberOrderHistoryEntity) {

        return MemberOrderHistory.of(
                memberOrderHistoryEntity.getId(),
                memberOrderHistoryEntity.getAmount(),
                new MappingInfo(
                        memberOrderHistoryEntity.getMember().getId(),
                        memberOrderHistoryEntity.getOrder().getId()
                )
        );
    }

    MemberOrderHistoryJpaEntity mapToEntity(
            final MemberOrderHistory memberOrderHistory,
            final MemberJpaEntity memberEntity,
            final OrderJpaEntity orderEntity
    ) {

        return MemberOrderHistoryJpaEntity.builder()
                .id(memberOrderHistory.getId())
                .amount(memberOrderHistory.getAmount())
                .member(memberEntity)
                .order(orderEntity)
                .build();
    }
}
