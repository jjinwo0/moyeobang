package com.ssafy.moyeobang.settle.adapter.out.persistence.account.transaction;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.settle.application.domain.account.Transaction;
import com.ssafy.moyeobang.settle.application.error.TransactionNotFoundException;
import com.ssafy.moyeobang.settle.application.port.out.FindTransactionPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class TransactionPersistenceAdapter implements FindTransactionPort {

    private final WithdrawRepository withdrawRepository;

    private final DepositRepository depositRepository;

    private final TransactionMapper transactionMapper;

    @Override
    public Transaction findWithdraw(Long transactionId) {

        WithdrawEntity findEntity = withdrawRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Withdraw id[" + transactionId + "] 정보를 찾을 수 없습니다."));

        return transactionMapper.mapToWithdrawDomain(findEntity);
    }

    @Override
    public Transaction findDeposit(Long transactionId) {

        DepositEntity findEntity = depositRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Deposit id[" + transactionId + "] 정보를 찾을 수 없습니다."));

        return transactionMapper.mapToDepositDomain(findEntity);
    }

    @Override
    public WithdrawEntity findWithdrawEntity(Long transactionId) {

        return withdrawRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Withdraw id[" + transactionId + "] 정보를 찾을 수 없습니다."));
    }
}
