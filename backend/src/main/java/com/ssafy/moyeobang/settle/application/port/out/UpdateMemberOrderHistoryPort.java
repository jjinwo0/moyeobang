package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;

public interface UpdateMemberOrderHistoryPort {

    void deleteMemberOrderHistory(Long id);
}
