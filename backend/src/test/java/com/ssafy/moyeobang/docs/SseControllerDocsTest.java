package com.ssafy.moyeobang.docs;


import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.payment.application.port.in.SseUseCase;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class SseControllerDocsTest extends RestDocsSupport {
    @MockBean
    private SseUseCase sseUseCase;

    @DisplayName("SSE 연결 API")
    @Test
    void connectToSseTest() throws Exception {
        // Given
        SseEmitter emitter = new SseEmitter();
        given(sseUseCase.connect(anyString())).willReturn(emitter);

        // When & Then
        mockMvc.perform(get("/api/payment/connect")
                        .param("paymentRequestId", "payment-123")
                        .accept(MediaType.TEXT_EVENT_STREAM_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("sse-connect",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        queryParameters(
                                parameterWithName("paymentRequestId").description("결제 요청 ID")
                        )
                ));
    }
}
