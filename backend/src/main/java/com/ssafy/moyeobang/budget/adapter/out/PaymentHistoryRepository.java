package com.ssafy.moyeobang.budget.adapter.out;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PaymentHistoryRepository extends ElasticsearchRepository<PaymentHistory, String>, PaymentHistoryRepositoryCustom {
}
