package com.ssafy.moyeobang.settle.adapter.in.web.request;

import java.util.List;

public record OrderRequest(String title, Integer amount, List<Long> participants, String splitMethod) {
}
