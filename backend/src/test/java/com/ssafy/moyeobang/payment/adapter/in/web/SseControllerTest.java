package com.ssafy.moyeobang.payment.adapter.in.web;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SseControllerTest extends WebAdapterTestSupport {

    @MockBean
    private SseUseCase sseUseCase;

    @DisplayName("결제 요청 API 를 호출하면, connected 메시지를 받아야한다")
    @Test
    void testSseConnect() throws Exception {
        // Given
        String paymentRequestId = "payment-123";
        SseEmitter emitter = new SseEmitter(180000L);

        when(sseUseCase.connect(paymentRequestId)).thenReturn(emitter);

        MvcResult mvcResult = mockMvc.perform(get("/api/payment/connect")
                        .param("paymentRequestId", paymentRequestId)
                        .accept(TEXT_EVENT_STREAM_VALUE))
                .andExpect(request().asyncStarted())
                .andReturn();

        emitter.send(SseEmitter.event().name("connect").data("connected!"));

        emitter.complete();

        mockMvc.perform(asyncDispatch(mvcResult))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(TEXT_EVENT_STREAM_VALUE))
                .andExpect(content().string(containsString("connected")));

    }
}
