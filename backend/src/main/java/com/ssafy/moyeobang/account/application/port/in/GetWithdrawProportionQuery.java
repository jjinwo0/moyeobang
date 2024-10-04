package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawProportionResponse;
import java.util.List;

public interface GetWithdrawProportionQuery {

    List<GetWithdrawProportionResponse> getWithdrawProportion(Long accountId);
}
