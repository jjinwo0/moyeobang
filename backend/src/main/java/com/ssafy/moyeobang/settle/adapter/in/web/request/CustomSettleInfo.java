package com.ssafy.moyeobang.settle.adapter.in.web.request;

public record CustomSettleInfo(Integer amount,
                               Long memberId,
                               String splitMethod) {
}
