package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.common.error.exception.EntityNotFoundException;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import com.ssafy.moyeobang.settle.adapter.out.persistence.member.MemberRepositoryInSettle;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;
import com.ssafy.moyeobang.settle.application.port.out.CreateMemberOrderHistoryPort;
import com.ssafy.moyeobang.settle.application.port.out.LoadMemberOrderHistoryPort;
import java.util.List;

import com.ssafy.moyeobang.settle.application.port.out.UpdateMemberOrderHistoryPort;
import com.ssafy.moyeobang.settle.error.MemberOrderHistoryNotFoundException;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class MemberOrderPersistenceAdapter implements CreateMemberOrderHistoryPort, LoadMemberOrderHistoryPort, UpdateMemberOrderHistoryPort {

    private final MemberRepositoryInSettle memberRepository;

    private final OrderRepositoryInSettle orderRepository;

    private final MemberOrderHistoryRepositoryInSettle memberOrderHistoryRepository;

    private final MemberOrderHistoryMapper mapper;

    @Override
    public MemberOrderHistory createMemberOrderHistory(Integer amount, MappingInfo info) {

        MemberJpaEntity findMember = memberRepository.findById(info.memberId())
                .orElseThrow(() -> new EntityNotFoundException("id[" + info.memberId() + "] 의 회원 정보를 찾을 수 없습니다."));

        OrderJpaEntity findOrder = orderRepository.findById(info.orderId())
                .orElseThrow(() -> new EntityNotFoundException("id[" + info.orderId() + "] 의 주문 정보를 찾을 수 없습니다."));

        MemberOrderHistoryJpaEntity createEntity = MemberOrderHistoryJpaEntity.builder()
                .amount(amount)
                .member(findMember)
                .order(findOrder)
                .build();

        memberOrderHistoryRepository.save(createEntity);

        return mapper.mapToDomain(createEntity);
    }

    @Override
    public List<MemberOrderHistory> findByOrderId(Long orderId) {

        List<MemberOrderHistoryJpaEntity> findList = memberOrderHistoryRepository.findByOrderId(orderId);

        return mapper.mapToDomainList(findList);
    }

    @Override
    public MemberOrderHistory findById(Long id) {

        MemberOrderHistoryJpaEntity findEntity = memberOrderHistoryRepository.findById(id)
                .orElseThrow(() -> new MemberOrderHistoryNotFoundException("[" + id + "] 해당하는 회원 별 결제 기록을 찾을 수 없습니다."));

        return mapper.mapToDomain(findEntity);
    }

    @Override
    public void deleteMemberOrderHistory(Long id) {

        memberOrderHistoryRepository.findById(id)
                        .ifPresent(memberOrderHistoryRepository::delete);
    }
}
