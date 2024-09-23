package com.ssafy.moyeobang.payment.application.port.in;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseUseCase {
    SseEmitter connect(String transactionId);
}
