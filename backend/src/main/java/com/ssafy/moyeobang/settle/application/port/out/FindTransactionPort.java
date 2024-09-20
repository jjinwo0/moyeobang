package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.common.persistenceentity.withdraw.WithdrawJpaEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;

public interface FindTransactionPort {

    Transaction findWithdraw(Long transactionId);

    Transaction findDeposit(Long transactionId);

    WithdrawJpaEntity findWithdrawEntity(Long transactionId);
}
