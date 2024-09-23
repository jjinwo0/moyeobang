package com.ssafy.moyeobang.payment.adapter.in.server;

import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.OfflinePaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

public class OfflinePaymentControllerTest extends WebAdapterTestSupport {

    @MockBean
    private OfflinePaymentUseCase offlinePaymentUseCase;

    @DisplayName("결제 최종 API 요청이 들어오면 결제 성공 여부를 서버로 반환한다.")
    @Test
    void confirmPaymentToServer() throws Exception {
        // Given
        OfflinePaymentRequest request = new OfflinePaymentRequest(
                "payment-123",
                "store-001",
                "Sample Store",
                "1234 Address",
                37.7749,
                -122.4194,
                10000L,
                "source-acc-001",
                "target-acc-002"
        );

        given(offlinePaymentUseCase.confirmPayment(any(PaymentCommand.class)))
                .willReturn(true);

        mockMvc.perform(
                        post("/api/payment/confirm")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.error").value(nullValue()));
    }
}
