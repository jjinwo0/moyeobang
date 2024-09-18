package com.ssafy.moyeobang.payment.adapter.out;

import com.ssafy.moyeobang.common.annotation.PersistenceAdapter;
import com.ssafy.moyeobang.payment.adapter.out.persistence.withdraw.WithdrawRepositoryInPayment;
import com.ssafy.moyeobang.payment.application.domain.Withdraw;
import com.ssafy.moyeobang.payment.application.port.out.ProcessPaymentPort;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class PaymentAdapter implements ProcessPaymentPort {

    private final WithdrawRepositoryInPayment withdrawRepository;
    private final WithdrawMapper withdrawMapper;

    @Override
    public void saveWithdraw(Withdraw withdraw) {
        // 도메인 객체를 엔티티로 변환
        WithdrawEntity withdrawEntity = withdrawMapper.toEntity(withdraw);
        // 데이터베이스에 저장
        withdrawRepository.save(withdrawEntity);
    }
}

