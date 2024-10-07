package com.ssafy.moyeobang.settle.adapter.in.web.request;

import java.util.List;

public record SettleRequest(int money,
                            String createdAt,
                            String paymentName,
                            String address,
                            String acceptedNumber,
                            List<OrderRequest> details,
                            String splitMethod) {
}
