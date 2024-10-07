package com.ssafy.moyeobang.settle.adapter.in.web.request;

import java.util.List;

public record OrderRequest(String orderItemTitle,
                           Long orderItemId,
                           int orderItemQuantity,
                           int orderItemPrice,
                           List<Long> participants) {
}
