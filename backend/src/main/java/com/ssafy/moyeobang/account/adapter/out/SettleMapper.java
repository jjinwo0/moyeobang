package com.ssafy.moyeobang.account.adapter.out;

import static java.util.stream.Collectors.toMap;

import com.ssafy.moyeobang.account.application.domain.Money;
import com.ssafy.moyeobang.account.application.domain.Settle;
import com.ssafy.moyeobang.account.application.domain.Settles;
import com.ssafy.moyeobang.common.persistenceentity.order.OrderJpaEntity;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class SettleMapper {

    public Settles mapToSettles(List<OrderJpaEntity> orders) {
        List<Settle> settles = orders.stream()
                .map(this::mapToSettle)
                .toList();

        return new Settles(settles);
    }

    private Settle mapToSettle(OrderJpaEntity order) {
        return new Settle(getPaymentHistory(order));
    }

    private Map<Long, Money> getPaymentHistory(OrderJpaEntity order) {
        return order.getMemberOrderHistories().stream()
                .collect(toMap(
                                history -> history.getMember().getId(),
                                history -> Money.of(history.getAmount())
                        )
                );
    }
}
