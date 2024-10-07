package com.ssafy.moyeobang.account.adapter.out.persistence.withdraw;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WithdrawRepositoryInAccount extends JpaRepository<WithdrawJpaEntity, Long> {

    List<WithdrawJpaEntity> findByTravelAccountId(Long travelAccountId);
}
