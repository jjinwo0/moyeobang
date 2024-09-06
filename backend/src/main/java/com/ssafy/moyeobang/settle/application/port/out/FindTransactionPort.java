package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction.WithdrawEntity;
import com.ssafy.moyeobang.settle.application.domain.account.Action;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;

public interface FindTransactionPort {

    Transaction findWithdraw(Long transactionId);

    Transaction findDeposit(Long transactionId);

    WithdrawEntity findWithdrawEntity(Long transactionId);
}
