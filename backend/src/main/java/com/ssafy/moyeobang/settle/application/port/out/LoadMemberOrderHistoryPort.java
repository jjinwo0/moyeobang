package com.ssafy.moyeobang.settle.application.port.out;

import com.ssafy.moyeobang.settle.application.domain.order.MemberOrderHistory;
import java.util.List;

public interface LoadMemberOrderHistoryPort {

    List<MemberOrderHistory> findByOrderId(Long orderId);

    MemberOrderHistory findById(Long id);
}
