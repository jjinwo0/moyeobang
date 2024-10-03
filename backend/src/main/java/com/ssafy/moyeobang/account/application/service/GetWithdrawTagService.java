package com.ssafy.moyeobang.account.application.service;

import static com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawTagResponse.createResponses;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawTagResponse;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
import com.ssafy.moyeobang.account.application.port.in.GetWithdrawTagQuery;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetWithdrawTagService implements GetWithdrawTagQuery {

    private final LoadAccountPort loadAccountPort;

    @Override
    public List<GetWithdrawTagResponse> getWithdrawTag(Long accountId, Set<Long> memberIds) {
        TravelAccount account = loadAccountPort.loadTravelAccount(accountId);

        return createResponses(
                account.getWithdrawTagStatistics(memberIds)
        );
    }
}
