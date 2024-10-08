package com.ssafy.moyeobang.budget.adapter.out;

import java.util.List;

public interface PaymentHistoryRepositoryCustom {

    List<PaymentHistory> findBy(String placeName, List<Member> members);
}