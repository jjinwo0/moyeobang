package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberEntity;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import org.springframework.stereotype.Component;

@Component
public class MemberOrderHistoryMapper {

    MemberOrderHistory mapToDomain(final MemberOrderHistoryEntity memberOrderHistoryEntity) {

        return MemberOrderHistory.of(
                memberOrderHistoryEntity.getId(),
                memberOrderHistoryEntity.getAmount(),
                new MappingInfo(
                        memberOrderHistoryEntity.getMemberEntity().getId(),
                        memberOrderHistoryEntity.getOrderEntity().getId()
                )
        );
    }

    MemberOrderHistoryEntity mapToEntity(
            final MemberOrderHistory memberOrderHistory,
            final MemberEntity memberEntity,
            final OrderEntity orderEntity
    ) {

        return MemberOrderHistoryEntity.builder()
                .id(memberOrderHistory.getId())
                .amount(memberOrderHistory.getAmount())
                .memberEntity(memberEntity)
                .orderEntity(orderEntity)
                .build();
    }
}
