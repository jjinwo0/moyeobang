package com.ssafy.moyeobang.payment.application.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import com.ssafy.moyeobang.payment.application.port.out.SsePort;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SseServiceTest {

    private final SsePort ssePort = mock(SsePort.class);

    private final SseService sseService = new SseService(ssePort);

    @DisplayName("결제 요청 API가 들어오면 결제가 완료될때까지 대기한다")
    @Test
    void connect() {
        // given
        String transactionId = "payment-123";

        doNothing().when(ssePort).addSseEmitter(any(String.class), any(SseEmitter.class));
        doNothing().when(ssePort).sendConnectedMessage(any(String.class));

        // when
        SseEmitter resultEmitter = sseService.connect(transactionId);

        // then
        verify(ssePort).addSseEmitter(eq(transactionId), any(SseEmitter.class));
        verify(ssePort).sendConnectedMessage(eq(transactionId));

        assertThat(resultEmitter).isNotNull();
    }
}
