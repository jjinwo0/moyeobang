package com.ssafy.moyeobang.account.adapter.out.persistence.order;

import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import java.util.List;

public interface OrderQueryRepository {

    List<OrderJpaEntity> findBy(String accountNumber);
}
