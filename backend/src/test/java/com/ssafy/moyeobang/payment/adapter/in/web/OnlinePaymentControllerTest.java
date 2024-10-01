package com.ssafy.moyeobang.payment.adapter.in.web;


import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ssafy.moyeobang.payment.adapter.in.server.request.OfflinePaymentRequest;
import com.ssafy.moyeobang.payment.application.port.in.PaymentCommand;
import com.ssafy.moyeobang.payment.application.port.in.PaymentUseCase;
import com.ssafy.moyeobang.payment.application.port.out.PaymentResult;
import com.ssafy.moyeobang.support.WebAdapterTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

public class OnlinePaymentControllerTest extends WebAdapterTestSupport {
    @MockBean
    private PaymentUseCase paymentUseCase;

    @DisplayName("온라인 결제 요청이 들어오면 결제 성공 여부를 반환한다.")
    @Test
    void processPaymentToServer() throws Exception {
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

        PaymentResult paymentResult = new PaymentResult(12345L);
        given(paymentUseCase.processPayment(any(PaymentCommand.class)))
                .willReturn(paymentResult);

        mockMvc.perform(
                        post("/api/payment/process")
                                .content(objectMapper.writeValueAsString(request))
                                .contentType(APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
                .andExpect(jsonPath("$.data.transactionId").value(12345L))
                .andExpect(jsonPath("$.error").value(nullValue()));
    }
}
