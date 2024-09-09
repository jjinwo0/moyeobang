package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberRepository;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import com.ssafy.moyeobang.settle.application.error.EntityNotFoundException;
import com.ssafy.moyeobang.settle.application.port.out.CreateMemberOrderHistoryPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberOrderPersistenceAdapter implements CreateMemberOrderHistoryPort {

    private final MemberRepository memberRepository;

    private final OrderRepository orderRepository;

    private final MemberOrderHistoryRepository memberOrderHistoryRepository;

    private final MemberOrderHistoryMapper mapper;

    @Override
    public MemberOrderHistory createMemberOrderHistory(Integer amount, MappingInfo info) {

        MemberEntity findMember = memberRepository.findById(info.memberId())
                .orElseThrow(() -> new EntityNotFoundException("id[" + info.memberId() + "] 의 회원 정보를 찾을 수 없습니다."));

        OrderEntity findOrder = orderRepository.findById(info.orderId())
                .orElseThrow(() -> new EntityNotFoundException("id[" + info.orderId() + "] 의 주문 정보를 찾을 수 없습니다."));

        MemberOrderHistoryEntity createEntity = MemberOrderHistoryEntity.builder()
                .amount(amount)
                .memberEntity(findMember)
                .orderEntity(findOrder)
                .build();

        memberOrderHistoryRepository.save(createEntity);

        return mapper.mapToDomain(createEntity);
    }
}
