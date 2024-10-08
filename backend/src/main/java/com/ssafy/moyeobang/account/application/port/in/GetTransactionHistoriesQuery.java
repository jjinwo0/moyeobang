package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetTransactionHistoriesResponse;
import java.util.List;
import java.util.Set;

public interface GetTransactionHistoriesQuery {

    List<GetTransactionHistoriesResponse> getTransactionHistories(Long accountId, Set<Long> memberIds);
}
