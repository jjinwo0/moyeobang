package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.common.util.SseUtils;
import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@UseCase
@RequiredArgsConstructor
public class SseService implements SseUseCase {

    private final SseUtils sseEmitters;

    @Override
    public SseEmitter connect(String transactionId) {
        SseEmitter emitter = new SseEmitter(180000L); // 180초 3분 타임아웃
        sseEmitters.add(transactionId, emitter);
        sseEmitters.sendEvent(transactionId, "connect", "connected! Waiting for payment...");
        return emitter;
    }
}
