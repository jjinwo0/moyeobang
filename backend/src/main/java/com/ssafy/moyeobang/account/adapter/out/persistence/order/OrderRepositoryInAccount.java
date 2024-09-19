package com.ssafy.moyeobang.account.adapter.out.persistence.order;

import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepositoryInAccount extends JpaRepository<OrderJpaEntity, Long>, OrderQueryRepository {
}
