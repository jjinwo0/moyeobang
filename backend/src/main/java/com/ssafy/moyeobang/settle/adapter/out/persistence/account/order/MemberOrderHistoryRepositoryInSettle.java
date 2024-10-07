package com.ssafy.moyeobang.settle.adapter.out.persistence.account.order;

import com.ssafy.moyeobang.common.persistenceentity.member.MemberOrderHistoryJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberOrderHistoryRepositoryInSettle extends JpaRepository<MemberOrderHistoryJpaEntity, Long> {

    @Query("select h from MemberOrderHistoryJpaEntity h join fetch h.order o where o.id = :orderId")
    List<MemberOrderHistoryJpaEntity> findByOrderId(@Param("orderId") Long orderId);
}
