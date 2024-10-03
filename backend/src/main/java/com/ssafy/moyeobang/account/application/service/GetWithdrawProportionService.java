package com.ssafy.moyeobang.account.application.service;

import static com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawProportionResponse.createResponses;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawProportionResponse;
import com.ssafy.moyeobang.account.application.domain.TravelAccount;
import com.ssafy.moyeobang.account.application.port.in.GetWithdrawProportionQuery;
import com.ssafy.moyeobang.account.application.port.out.LoadAccountPort;
import com.ssafy.moyeobang.common.annotation.UseCase;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetWithdrawProportionService implements GetWithdrawProportionQuery {

    private final LoadAccountPort loadAccountPort;

    @Override
    public List<GetWithdrawProportionResponse> getWithdrawProportion(Long accountId) {
        TravelAccount account = loadAccountPort.loadTravelAccount(accountId);

        return createResponses(
                account.getMemberWithdrawStatistics()
        );
    }
}
