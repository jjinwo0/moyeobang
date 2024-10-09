package com.ssafy.moyeobang.payment.adapter.out.persistence.paymentHistory;


import com.ssafy.moyeobang.payment.adapter.out.PaymentHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PaymentHistoryRepositoryInPayment extends ElasticsearchRepository<PaymentHistory, String> {
}
