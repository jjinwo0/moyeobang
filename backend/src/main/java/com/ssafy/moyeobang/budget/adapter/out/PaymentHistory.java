package com.ssafy.moyeobang.budget.adapter.out;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "payment_history")
public class PaymentHistory {

    @Id
    private String id;

    private List<Member> member;
    private Long memberCount;
    private Long totalPrice;
    private Map<String, Long> orderHistory;
    private String placeName;
}
