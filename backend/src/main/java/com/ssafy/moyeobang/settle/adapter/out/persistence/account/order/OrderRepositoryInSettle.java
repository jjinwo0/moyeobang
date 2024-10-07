package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepositoryInSettle extends JpaRepository<OrderJpaEntity, Long> {

    @Query("select o from OrderJpaEntity o join fetch o.withdraw w where w.id = :transactionId")
    List<OrderJpaEntity> findByTransactionId(@Param("transactionId") Long transactionId);
}
