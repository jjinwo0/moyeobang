package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepositoryInSettle extends JpaRepository<OrderJpaEntity, Long> {
}
