package com.ssafy.moyeobang.account.application.port.in;

import com.ssafy.moyeobang.account.adapter.in.web.response.GetWithdrawTagResponse;
import java.util.List;
import java.util.Set;

public interface GetWithdrawTagQuery {

    List<GetWithdrawTagResponse> getWithdrawTag(Long accountId, Set<Long> memberIds);
}
