package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.adapter.out.sse.SseEmitters;
import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@UseCase
@RequiredArgsConstructor
public class SseService implements SseUseCase {

    private final SseEmitters sseEmitters;

    @Override
    public SseEmitter connect(String transactionId) {
        SseEmitter emitter = new SseEmitter(180000L); // 180초 3분 타임아웃
        sseEmitters.add(transactionId, emitter);
        sseEmitters.sendEvent(emitter, "connect", "connected! Waiting for payment...");

        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected! Waiting for payment..."));
        } catch (IOException e) {
            throw new RuntimeException("Failed to send initial SSE event", e);
        }
        return emitter;
    }
}
