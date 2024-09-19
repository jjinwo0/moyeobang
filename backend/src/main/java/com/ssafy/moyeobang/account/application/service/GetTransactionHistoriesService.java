package com.ssafy.moyeobang.account.application.service;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoriesResponse;
import com.ssafy.moyeobang.account.application.domain.travelaccount.Transactions;
import com.ssafy.moyeobang.account.application.domain.travelaccount.TravelAccount;
import com.ssafy.moyeobang.account.application.port.in.GetTransactionHistoriesQuery;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class GetTransactionHistoriesService implements GetTransactionHistoriesQuery {

    private final LoadAccountPort loadAccountPort;

    @Override
    public List<GetTransactionHistoriesResponse> getTransactionHistories(Long accountId, List<Long> memberIds) {
        TravelAccount travelAccount = loadAccountPort.loadTravelAccount(accountId);
        Transactions transactions = travelAccount.getTransactions();

        return transactions.stream()
                .map(GetTransactionHistoriesResponse::new)
                .toList();
    }
}
