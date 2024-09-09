package com.ssafy.moyeobang.payment.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.common.util.ApiUtils;
import com.ssafy.moyeobang.common.util.ApiUtils.ApiResult;
import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@WebAdapter
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class SseController {

    private final SseUseCase sseUseCase;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ApiResult<?> connect(@RequestParam String transactionId) {
        // TODO: success만 있으면 헷갈릴 것 같기도 하고..
        return ApiUtils.success(sseUseCase.connect(transactionId));
    }

}
