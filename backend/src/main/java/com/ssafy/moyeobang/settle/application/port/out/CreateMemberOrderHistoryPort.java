package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory.MappingInfo;

public interface CreateMemberOrderHistoryPort {

    MemberOrderHistory createMemberOrderHistory(Integer amount, MappingInfo info);
}
