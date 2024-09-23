package com.ssafy.moyeobang.payment.application.service;

import com.ssafy.moyeobang.common.annotation.UseCase;
import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@UseCase
@RequiredArgsConstructor
public class SseService implements SseUseCase {

    private final SsePort ssePort;

    @Override
    public SseEmitter connect(String transactionId) {
        SseEmitter emitter = new SseEmitter(180000L);
        ssePort.addSseEmitter(transactionId, emitter);
        ssePort.sendConnectedMessage(transactionId);
        return emitter;
    }
}
