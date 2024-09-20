package com.ssafy.moyeobang.settle.adapter.in.web.request;

import java.util.List;

public record SettleRequest(List<OrderRequest> orderItems) {
}
