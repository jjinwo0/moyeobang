package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoriesResponse;
import java.util.List;

public interface GetTransactionHistoriesQuery {

    List<GetTransactionHistoriesResponse> getTransactionHistories(Long accountId, List<Long> memberIds);
}
