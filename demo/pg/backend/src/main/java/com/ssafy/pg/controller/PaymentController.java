package com.ssafy.pg.controller;

import com.ssafy.pg.domain.request.PaymentConfirmRequest;
import com.ssafy.pg.utils.SseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@Controller
@RequestMapping("/pg/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final SseUtils sseUtils;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(@RequestParam String paymentRequestId) {
        SseEmitter emitter = new SseEmitter(300000L);
        sseUtils.add(paymentRequestId, emitter);
        sseUtils.sendConnectedMessage(paymentRequestId);
        return emitter;
    }

    @PostMapping("/confirm")
    public void confirm(@RequestBody PaymentConfirmRequest request) {
        String paymentRequestId = request.paymentRequestId();
        String status = request.status();
        if(status.equals("SUCCESS")){
            sseUtils.sendPaymentSuccess(paymentRequestId);
            return;
        }
        sseUtils.sendPaymentFailure(paymentRequestId);
    }
}
