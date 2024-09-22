package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoryResponse;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
import com.ssafy.moyeobang.account.application.domain.Withdrawal;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoryQuery;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.account.error.TransactionNotFoundException;
import com.ssafy.moyeobang.common.annotation.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetTransactionHistoryService implements GetTransactionHistoryQuery {

    private final LoadAccountPort loadAccountPort;

    @Override
    public GetTransactionHistoryResponse getTransactionHistory(Long accountId, Long transactionId) {
        TravelAccount travelAccount = loadAccountPort.loadTravelAccount(accountId);

        Withdrawal withdrawal = travelAccount.findTransactionBy(transactionId)
                .orElseThrow(TransactionNotFoundException::new);

        return GetTransactionHistoryResponse.ofType(withdrawal);
    }
}
