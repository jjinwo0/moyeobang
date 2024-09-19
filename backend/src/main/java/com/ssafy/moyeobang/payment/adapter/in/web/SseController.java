package com.ssafy.moyeobang.payment.adapter.in.web;

import com.ssafy.moyeobang.common.annotation.WebAdapter;
import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@WebAdapter
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class SseController {

    private final SseUseCase sseUseCase;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(@RequestParam String paymentRequestId) {
        log.info("SSE 연결 시작: transactionId={}", paymentRequestId);
        return sseUseCase.connect(paymentRequestId);
    }

}
