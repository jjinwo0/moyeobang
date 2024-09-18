package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.payment.application.domain.Withdraw;

public class WithdrawMapper {

    public WithdrawJpaEntity toEntity(Withdraw withdraw) {
        return new WithdrawEntity(
                withdraw.getFromAccount(),
                withdraw.getToAccount(),
                withdraw.getAmount()
        );
    }
}
